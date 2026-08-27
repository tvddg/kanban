import { ICard } from "@/types";
import { CardId } from "@/types/brands";
import computeCardInsertPosition from "./computeCardInsertPosition";

export default function computeCardPlacement(
    targetCards: ICard[],
    cardId: CardId,
    targetCardId: CardId
): number | null {
    const cardsWithoutMovingCard = targetCards.filter(card => card.id !== cardId);
    const targetIndex = cardsWithoutMovingCard.findIndex(card => card.id === targetCardId);
    if (targetIndex === -1)
        return null;

    const currentIndex = targetCards.findIndex(card => card.id === cardId);

    const insertIndex = currentIndex !== -1 && currentIndex <= targetIndex
        ? targetIndex + 1
        : targetIndex;

    if (currentIndex === insertIndex)
        return null;

    return computeCardInsertPosition(cardsWithoutMovingCard, insertIndex);
}
