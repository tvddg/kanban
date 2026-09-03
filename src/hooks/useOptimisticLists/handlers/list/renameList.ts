import { ListAction } from "../../actions";
import { ListId } from "@/types/brands";
import showToastError from "@/utils/toasts/showToastError";
import { renameList } from "@/lib/supabase/queries/list";
import { TransitionStartFunction } from "react";

interface UtilityFunctions {
    dispatch: (action: ListAction) => void;
    updateLists: () => Promise<void>;
    startTransition: TransitionStartFunction
}

interface RenameListProps {
    id: ListId;
    name: string;
}

export default function handleRenameList(
    { dispatch, updateLists, startTransition }: UtilityFunctions,
    { id, name }: RenameListProps
) {
    startTransition(async () => {
        dispatch({
            type: "RENAME_LIST",
            payload: { id, name }
        });

        try {
            await renameList(id, name);
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