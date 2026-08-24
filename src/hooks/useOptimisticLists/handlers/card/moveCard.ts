import { CardId, ListId } from "@/types/brands";
import { startTransition } from "react";
import { CardAction } from "../../actions";
import showToastError from "@/utils/showToastError";
import { moveCard } from "@/lib/supabase/queries";

interface MoveCardProps {
    cardId: CardId;
    sourceListId: ListId;
    targetListId: ListId;
    position: number;
}

export default function handleMoveCard(
    dispatch: (action: CardAction) => void,
    updateLists: () => Promise<void>,
    { cardId, sourceListId, targetListId, position }: MoveCardProps
) {
    startTransition(async () => {
        dispatch({
            type: "MOVE_CARD",
            payload: {
                cardId,
                sourceListId,
                targetListId,
                position
            }
        });

        try {
            await moveCard(cardId, targetListId, position);
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