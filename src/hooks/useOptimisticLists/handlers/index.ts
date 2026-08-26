import { CardAction, ListAction } from "../actions";
import cardHandlers from "./card";
import listHandlers from "./list";
import { TransitionStartFunction } from "react";
import UtilityFunctions from "./utilityFunctions";

type GenericHandlersMap = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: (utilityFunctions: UtilityFunctions, props: any) => void;
};
type WrappedHandlers<THandlers extends GenericHandlersMap> = {
    [Key in keyof THandlers]: (props: Parameters<THandlers[Key]>[1]) => ReturnType<THandlers[Key]>;
};

export type UnitedHandlers = WrappedHandlers<typeof cardHandlers> & 
    WrappedHandlers<typeof listHandlers>;

export default function getAllHandlers(
    dispatch: (action: ListAction | CardAction) => void,
    startTransition: TransitionStartFunction,
    updateLists: () => Promise<void>,
    applyAction: (action: ListAction | CardAction) => void
) {
    
    return {
        ...Object.fromEntries(
            Object.entries(cardHandlers).map(([key, handler]) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const wrappedHandler = (props: any) =>
                    handler({ dispatch, updateLists, startTransition }, props);
                return [key, wrappedHandler];
            })
        ),
        ...Object.fromEntries(
            Object.entries(listHandlers).map(([key, handler]) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const wrappedHandler = (props: any) =>
                    handler({ dispatch, updateLists, startTransition }, props);
                return [key, wrappedHandler];
            })
        ),
        previewMoveCard: (props: Parameters<typeof cardHandlers.previewMoveCard>[1]) =>
            cardHandlers.previewMoveCard({ 
                dispatch: applyAction, 
                updateLists: () => new Promise(res => res()), 
                startTransition: () => {} 
            }, props)
    } as unknown as UnitedHandlers;
}