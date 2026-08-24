import { CardId, ListId } from "@/types/brands";
import { startTransition } from "react";
import { CardAction } from "../../actions";
import showToastError from "@/utils/showToastError";
import { updateCard } from "@/lib/supabase/queries";

interface EditCardProps {
    listId: ListId;
    cardId: CardId;
    title: string;
}

export default function handleEditCard(
    dispatch: (action: CardAction) => void,
    updateLists: () => Promise<void>,
    { listId, cardId, title }: EditCardProps
) {
    startTransition(async () => {
        dispatch({
            type: "EDIT_CARD",
            payload: { listId, cardId, title }
        });

        try {
            await updateCard(cardId, title);
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