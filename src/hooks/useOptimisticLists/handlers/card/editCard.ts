import { CardId, ListId } from "@/types/brands";
import { CardAction } from "../../actions";
import showToastError from "@/utils/showToastError";
import { updateCard } from "@/lib/supabase/queries";
import { TransitionStartFunction } from "react";

interface UtilityFunctions {
    dispatch: (action: CardAction) => void;
    updateLists: () => Promise<void>;
    startTransition: TransitionStartFunction
}

interface EditCardProps {
    listId: ListId;
    cardId: CardId;
    title: string;
}

export default function handleEditCard(
    { dispatch, updateLists, startTransition }: UtilityFunctions,
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