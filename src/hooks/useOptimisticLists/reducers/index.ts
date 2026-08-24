import { ListWithCards } from "@/types";
import cardReducer from "./cardReducer";
import listReducer from "./listReducer";
import { CardAction, isCardAction, isListAction, ListAction } from "../actions";

const rootReducer = (state: ListWithCards[], action: ListAction | CardAction) => {
    if (isCardAction(action)) {
        return cardReducer(state, action);
    } else if (isListAction(action)) {
        return listReducer(state, action);
    }
    return state;
};

export default rootReducer;