import { CardId, ListId } from "@/types/brands";
import { addCard } from "@/lib/supabase/queries/card";
import showToastError from "@/utils/toasts/showToastError";
import UtilityFunctions from "../utilityFunctions";

interface AddCardProps {
    listId: ListId;
    position: number;
    title: string;
    description?: string;
}

export default function handleAddCard(
    { dispatch, updateLists, startTransition }: UtilityFunctions,
    { listId, position, title, description }: AddCardProps
) {
    const createdAt = new Date().toLocaleDateString("sv-SE");
    const id = Date.now() * -1 as CardId;

    startTransition(async () => {
        dispatch({
            type: "ADD_CARD",
            payload: {
                cardId: id,
                createdAt,
                listId,
                title,
                position,
                description
            }
        });
        try {
            await addCard(
                listId,
                position,
                title,
                description
            );
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