import { CardId, ListId } from "@/types/brands";
import { CardAction } from "../../actions";
import showToastError from "@/utils/showToastError";
import { moveCard } from "@/lib/supabase/queries";
import { TransitionStartFunction } from "react";

interface UtilityFunctions {
    dispatch: (action: CardAction) => void;
    updateLists: () => Promise<void>;
    startTransition: TransitionStartFunction
}

interface MoveCardProps {
    cardId: CardId;
    sourceListId: ListId;
    targetListId: ListId;
    position: number;
}

export default function handleMoveCard(
    { dispatch, updateLists, startTransition }: UtilityFunctions,
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