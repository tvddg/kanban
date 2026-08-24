import { BoardId } from "@/types/brands";
import { CardAction, ListAction } from "../actions";
import cardHandlers from "./card";
import listHandlers from "./list";
import { Dispatch, SetStateAction } from "react";
import { ListWithCards } from "@/types";
import { getBoard } from "@/lib/supabase/queries";

type GenericHandlersMap = {
    [key: string]: (dispatch: any, updateLists: any, props: any) => any;
};
type WrappedHandlers<THandlers extends GenericHandlersMap> = {
    [Key in keyof THandlers]: (props: Parameters<THandlers[Key]>[2]) => ReturnType<THandlers[Key]>;
};

type UnitedHandlers = WrappedHandlers<typeof cardHandlers> & 
    WrappedHandlers<typeof listHandlers>;

export default function getAllHandlers(
    dispatch: (action: ListAction | CardAction) => void,
    boardId: BoardId,
    setLists: Dispatch<SetStateAction<ListWithCards[]>>
) {
    const updateLists = async () => 
        setLists((await getBoard(boardId)).lists);
    return {
        ...Object.fromEntries(
            Object.entries(cardHandlers).map(([key, handler]) => {
                const wrappedHandler = (props: any) =>
                    handler(dispatch, updateLists, props);
                return [key, wrappedHandler];
            })
        ),
        ...Object.fromEntries(
            Object.entries(listHandlers).map(([key, handler]) => {
                const wrappedHandler = (props: any) =>
                    handler(dispatch, updateLists, props);
                return [key, wrappedHandler];
            })
        )
    } as unknown as UnitedHandlers;
}