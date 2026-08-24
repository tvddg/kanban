import { ListWithCards } from "@/types";
import { CardAction } from "../actions";
import { produce } from "immer";

const cardReducer = (state: ListWithCards[], action: CardAction) => {
    return produce(state, draftState => {
        switch (action.type) {
            case "ADD_CARD": {
                const targetList = draftState.find(list => list.id === action.payload.listId);
                if (!targetList) return;

                const isPresent = targetList.cards.some(card => card.id === action.payload.cardId);
                if (isPresent) return;

                targetList.cards.push({
                    created_at: action.payload.createdAt,
                    description: action.payload.description ?? null,
                    id: action.payload.cardId,
                    list_id: action.payload.listId,
                    position: action.payload.position,
                    title: action.payload.title
                });

                targetList.cards.sort((c1, c2) => c2.position - c1.position);
                return;
            }
            case "MOVE_CARD": {
                const { cardId, sourceListId, targetListId, position } = action.payload;
                let [sourceList, targetList]: ListWithCards[] = [];
                draftState.forEach(li => {
                    if (li.id === sourceListId) {
                        sourceList = li;
                    }
                    if (li.id === targetListId) {
                        targetList = li;
                    }
                });
                if (!sourceList || !targetList)
                    throw new Error(`List not found`);

                const oldCard = sourceList.cards.find(c => c.id === cardId);
                if (!oldCard) return;

                sourceList.cards = sourceList.cards.filter(c => c.id !== oldCard.id);

                targetList.cards.push({
                    ...oldCard,
                    list_id: targetListId,
                    position
                });
                targetList.cards.sort((c1, c2) => c2.position - c1.position);
                return;
            }
            case "DELETE_CARD": {
                const { cardId, listId } = action.payload;
                const list = draftState.find(li => li.id === listId);
                if (!list) return;

                list.cards = list.cards.filter(c => c.id !== cardId);
                return;
            }
            case "EDIT_CARD": {
                const { listId, cardId, title } = action.payload;

                const list = draftState.find(li => li.id === listId);
                if (list === undefined) return;

                const card = list.cards.find(card => card.id === cardId);
                if (card === undefined) return;

                card.title = title;
                return;
            }
        }
    })
};

export default cardReducer;