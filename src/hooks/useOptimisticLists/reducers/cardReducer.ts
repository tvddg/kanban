import { ICard, ListWithCards } from "@/types";
import { CardAction } from "../actions";
import { CardId } from "@/types/brands";

const cardReducer = (state: ListWithCards[], action: CardAction) => {
    switch (action.type) {
        case "ADD_CARD":
            {
                const targetList = state.find(list => list.id === action.payload.listId);
                if (targetList === undefined) {
                    return state;
                }
                const isPresent = targetList.cards.find(card => card.id < 0) !== undefined;
                if (isPresent) {
                    return state;
                }

                const card: ICard = {
                    created_at: (new Date).toLocaleDateString('sv-SE'),
                    description: action.payload.description ?? null,
                    id: Date.now() * -1 as CardId,
                    list_id: action.payload.listId,
                    position: action.payload.position,
                    title: action.payload.title
                }
                return [
                    ...(state.filter(list => list.id !== targetList.id)),
                    {
                        ...targetList,
                        cards: [
                            ...targetList.cards,
                            card
                        ]
                    }
                ].sort((li1, li2) => li1.position - li2.position);
            }
        case "MOVE_CARD": {
            const { cardId, sourceListId, targetListId, position } = action.payload;
            let [sourceList, targetList]: ListWithCards[] = [];
            for (const li of state) {
                if (li.id === sourceListId) {
                    sourceList = li;
                }
                if (li.id === targetListId) {
                    targetList = li;
                }
            }
            if (!sourceList) {
                throw new Error(`List ${sourceListId} not found`);
            } else if (!targetListId) {
                throw new Error(`List ${targetListId} not found`);
            }
            const oldCard = sourceList.cards.find(c => c.id === cardId);
            if (oldCard === undefined) {
                return state;
            }
            const newCard: ICard = {
                ...oldCard,
                list_id: targetListId,
                position
            }

            return [
                ...state.filter(li => li.id !== sourceListId && li.id !== targetListId),
                {
                    ...sourceList,
                    cards: sourceList.cards.filter(c => c.id !== oldCard.id)
                },
                {
                    ...targetList,
                    cards: [
                        ...targetList.cards,
                        newCard
                    ].sort((c1, c2) => c2.position - c1.position)
                }
            ].sort((li1, li2) => li1.position - li2.position);
        }
        case "DELETE_CARD": {
            const { cardId, listId } = action.payload;
            const list = state.find(li => li.id === listId);
            if (list === undefined) {
                return state;
            }
            return [
                ...state.filter(li => li.id !== list.id),
                {
                    ...list,
                    cards: list.cards
                        .filter(card => card.id !== cardId)
                        .sort((c1, c2) => c2.position - c1.position)
                }
            ].sort((li1, li2) => li1.position - li2.position);
        }
        case "EDIT_CARD": {
            const { listId, cardId, title } = action.payload;

            const list = state.find(li => li.id === listId);
            if (list === undefined) return state;

            const card = list.cards.find(card => card.id === cardId);
            if (card === undefined) return state;

            return [
                ...state.filter(li => li.id !== list.id),
                {
                    ...list,
                    cards: [
                        ...list.cards.filter(card => card.id !== cardId),
                        {
                            ...card,
                            title
                        }
                    ].sort((c1, c2) => c2.position - c1.position)
                }
            ].sort((li1, li2) => li1.position - li2.position);
        }
    }
};

export default cardReducer;