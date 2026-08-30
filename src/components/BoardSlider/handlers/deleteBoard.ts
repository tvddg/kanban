import { deleteBoard } from "@/lib/supabase/queries/board";
import { BoardId } from "@/types/brands";
import showToastError from "@/utils/toasts/showToastError";

const handleDeleteBoard = async ({ id, refresh }:
    { id: BoardId, refresh: () => void }) => {
    await deleteBoard(id);
    refresh();
}

interface DeleteBoardParams {
    id: BoardId;
    refresh: () => void;
    closeMenu: () => void;
    setLoading: (val: boolean) => void;
}

export async function cbDeleteBoard({id, refresh, closeMenu, setLoading}: DeleteBoardParams) {
    closeMenu();
    setLoading(true);
    try {
        await handleDeleteBoard({ id, refresh: () => refresh() });
    } catch (err) {
        if (err instanceof Error)
            showToastError(err.message);
        else
            showToastError();
        setLoading(false);
    }
}