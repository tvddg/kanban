import { ListWithCards } from "@/types";
import { ListAction } from "../actions";

const listReducer = (state: ListWithCards[], action: ListAction) => {
    switch (action.type) {
        case "CREATE_LIST": {
            const { listId, createdAt, boardId, name, position } = action.payload;
            const exists = state.some(li => li.id === listId);
            if (exists) return state;

            return [
                ...state,
                {
                    id: listId,
                    board_id: boardId,
                    created_at: createdAt,
                    name,
                    position,
                    cards: []
                }
            ];
        }
        case "DELETE_LIST": {
            const { id } = action.payload;
            const exists = state.find(li => li.id === id);
            if (!exists) {
                return state;
            }
            return [
                ...state.filter(li => li.id !== id)
            ].sort((li1, li2) => li1.position - li2.position);
        }
    }
};

export default listReducer;