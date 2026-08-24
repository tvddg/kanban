import { startTransition } from "react";
import { ListAction } from "../../actions";
import { BoardId } from "@/types/brands";
import { createList } from "@/lib/supabase/queries";
import showToastError from "@/utils/showToastError";

interface CreateListProps {
    boardId: BoardId;
    name: string;
    position: number;
}

export default function handleCreateList(
    dispatch: (action: ListAction) => void,
    updateLists: () => Promise<void>,
    { boardId, name, position }: CreateListProps
) {
    startTransition(async () => {
        dispatch({
            type: "CREATE_LIST",
            payload: { boardId, name, position }
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