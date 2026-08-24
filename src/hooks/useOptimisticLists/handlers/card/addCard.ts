import { ListId } from "@/types/brands";
import { startTransition } from "react";
import { CardAction } from "../../actions";
import { addCard } from "@/lib/supabase/queries";
import showToastError from "@/utils/showToastError";

interface AddCardProps {
    listId: ListId;
    position: number;
    title: string;
    description?: string;
}

export default function handleAddCard(
    dispatch: (action: CardAction) => void,
    updateLists: () => Promise<void>,
    { listId, position, title, description }: AddCardProps
) {
    startTransition(() => {
        dispatch({
            type: "ADD_CARD",
            payload: {
                listId,
                title,
                position,
                description
            }
        });
    });

    (async () => {
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
    })()
}