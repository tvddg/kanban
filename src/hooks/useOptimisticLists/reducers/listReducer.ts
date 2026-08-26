import { ListWithCards } from "@/types";
import { ListAction } from "../actions";
import { produce } from "immer";

const listReducer = (state: ListWithCards[], action: ListAction) => {
    return produce(state, draftState => {
        switch (action.type) {
            case "CREATE_LIST": {
                const { listId, createdAt, boardId, name, position } = action.payload;
                const exists = draftState.some(li => li.id === listId);
                if (exists) return;

                draftState.push({
                    id: listId,
                    board_id: boardId,
                    created_at: createdAt,
                    name,
                    position,
                    cards: []
                });
                return;
            }
            case "DELETE_LIST": {
                const { id } = action.payload;
                const index = state.findIndex(li => li.id === id);
                if (index !== -1) 
                    draftState.splice(index, 1);
                return;
            }
        }
    });
};

export default listReducer;