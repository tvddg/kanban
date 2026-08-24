import { CardAction, ListAction } from "../actions";
import cardHandlers from "./card";
import listHandlers from "./list";
import { TransitionStartFunction } from "react";

type GenericHandlersMap = {
    [key: string]: (dispatch: any, updateLists: any, props: any) => any;
};
type WrappedHandlers<THandlers extends GenericHandlersMap> = {
    [Key in keyof THandlers]: (props: Parameters<THandlers[Key]>[1]) => ReturnType<THandlers[Key]>;
};

type UnitedHandlers = WrappedHandlers<typeof cardHandlers> & 
    WrappedHandlers<typeof listHandlers>;

export default function getAllHandlers(
    dispatch: (action: ListAction | CardAction) => void,
    startTransition: TransitionStartFunction,
    updateLists: () => Promise<void>
) {
    
    return {
        ...Object.fromEntries(
            Object.entries(cardHandlers).map(([key, handler]) => {
                const wrappedHandler = (props: any) =>
                    handler({ dispatch, updateLists, startTransition }, props);
                return [key, wrappedHandler];
            })
        ),
        ...Object.fromEntries(
            Object.entries(listHandlers).map(([key, handler]) => {
                const wrappedHandler = (props: any) =>
                    handler({ dispatch, updateLists, startTransition }, props);
                return [key, wrappedHandler];
            })
        )
    } as unknown as UnitedHandlers;
}