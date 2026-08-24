import { startTransition } from "react";
import { ListAction } from "../../actions";
import { ListId } from "@/types/brands";
import showToastError from "@/utils/showToastError";
import { deleteList } from "@/lib/supabase/queries";

interface DeleteListProps {
    id: ListId;
}

export default function handleDeleteList(
    dispatch: (action: ListAction) => void,
    updateLists: () => Promise<void>,
    { id }: DeleteListProps
) {
    startTransition(async () => {
        dispatch({
            type: "DELETE_LIST",
            payload: { id }
        });

        try {
            await deleteList(id);
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