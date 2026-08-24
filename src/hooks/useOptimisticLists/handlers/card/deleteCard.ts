import { CardId, ListId } from "@/types/brands";
import { TransitionStartFunction } from "react";
import { CardAction } from "../../actions";
import showToastError from "@/utils/showToastError";
import { deleteCard } from "@/lib/supabase/queries";

interface UtilityFunctions {
    dispatch: (action: CardAction) => void;
    updateLists: () => Promise<void>;
    startTransition: TransitionStartFunction
}

interface DeleteCardProps {
    cardId: CardId;
    listId: ListId;
}

export default function handleDeleteCard(
    { dispatch, updateLists, startTransition }: UtilityFunctions,
    { listId, cardId }: DeleteCardProps
) {
    startTransition(async () => {
        dispatch({
            type: "DELETE_CARD",
            payload: {
                listId,
                cardId
            }
        });
        try {
            await deleteCard(cardId);
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