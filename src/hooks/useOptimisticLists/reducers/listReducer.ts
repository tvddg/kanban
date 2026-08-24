import { ListWithCards } from "@/types";
import { ListAction } from "../actions";
import { BoardId, ListId } from "@/types/brands";

const listReducer = (state: ListWithCards[], action: ListAction) => {
    switch (action.type) {
        case "CREATE_LIST": {
            const { boardId, name, position } = action.payload;
            const exists = state.find(li => li.id < 0 && li.name === name);
            if (exists)
                return state;

            return [
                ...state,
                {
                    id: -Date.now() as ListId,
                    board_id: boardId,
                    created_at: new Date().toLocaleString(),
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