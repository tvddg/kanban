import { TransitionStartFunction } from "react";
import { CardAction, ListAction } from "../actions";

export default interface UtilityFunctions {
    dispatch: (action: ListAction | CardAction) => void;
    updateLists: () => Promise<void>;
    startTransition: TransitionStartFunction;
}