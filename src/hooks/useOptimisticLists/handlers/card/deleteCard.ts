import { CardId, ListId } from "@/types/brands";
import showToastError from "@/utils/showToastError";
import { deleteCard } from "@/lib/supabase/queries/card";
import UtilityFunctions from "../utilityFunctions";

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