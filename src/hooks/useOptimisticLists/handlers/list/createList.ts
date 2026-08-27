import { ListAction } from "../../actions";
import { BoardId, ListId } from "@/types/brands";
import { createList } from "@/lib/supabase/queries/list";
import showToastError from "@/utils/toasts/showToastError";
import { TransitionStartFunction } from "react";

interface UtilityFunctions {
    dispatch: (action: ListAction) => void;
    updateLists: () => Promise<void>;
    startTransition: TransitionStartFunction
}

interface CreateListProps {
    boardId: BoardId;
    name: string;
    position: number;
}

export default function handleCreateList(
    { dispatch, updateLists, startTransition }: UtilityFunctions,
    { boardId, name, position }: CreateListProps
) {
    const listId = Date.now() * -1 as ListId;
    const createdAt = new Date().toLocaleDateString("sv-SE");
    startTransition(async () => {
        dispatch({
            type: "CREATE_LIST",
            payload: { listId, createdAt, boardId, name, position }
        });

        try {
            await createList(boardId, name, position);
            await updateLists();
        } catch (err) {
            if (err instanceof Error) {
                showToastError(`Error: ${err.message}`)
            } else {
                showToastError();
            }
        }
    });
}