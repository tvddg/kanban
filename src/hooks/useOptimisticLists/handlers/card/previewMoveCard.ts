import { CardId, ListId } from "@/types/brands";
import { CardAction } from "../../actions";

interface UtilityFunctions {
    dispatch: (action: CardAction) => void;
}

interface PreviewMoveCardProps {
    cardId: CardId;
    sourceListId: ListId;
    targetListId: ListId;
    position: number;
}

export default function handlePreviewMoveCard(
    { dispatch }: UtilityFunctions,
    { cardId, sourceListId, targetListId, position }: PreviewMoveCardProps
) {
    dispatch({
        type: "MOVE_CARD",
        payload: {
            cardId,
            sourceListId,
            targetListId,
            position
        }
    });
}
