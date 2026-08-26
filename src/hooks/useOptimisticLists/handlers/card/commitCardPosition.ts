import { CardId, ListId } from "@/types/brands";
import showToastError from "@/utils/showToastError";
import { moveCard } from "@/lib/supabase/queries";
import { TransitionStartFunction } from "react";

interface UtilityFunctions {
    updateLists: () => Promise<void>;
    startTransition: TransitionStartFunction;
}

interface CommitCardPositionProps {
    cardId: CardId;
    listId: ListId;
    position: number;
}

export default function handleCommitCardPosition(
    { updateLists, startTransition }: UtilityFunctions,
    { cardId, listId, position }: CommitCardPositionProps
) {
    startTransition(async () => {
        try {
            await moveCard(cardId, listId, position);
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
