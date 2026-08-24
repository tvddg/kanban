import { CardId, ListId } from "@/types/brands";
import { TransitionStartFunction } from "react";
import { CardAction } from "../../actions";
import { addCard } from "@/lib/supabase/queries";
import showToastError from "@/utils/showToastError";

interface UtilityFunctions {
    dispatch: (action: CardAction) => void;
    updateLists: () => Promise<void>;
    startTransition: TransitionStartFunction
}

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