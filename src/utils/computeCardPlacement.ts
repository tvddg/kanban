import { ICard } from "@/types";
import { CardId } from "@/types/brands";
import computeCardInsertPosition from "./computeCardInsertPosition";

/**
 * Works out which position a dragged card should take in the list it currently
 * hovers, or null when it already sits exactly there and nothing needs to move.
 *
 * Cards are ordered by descending position. Every index here refers to the list
 * *without* the dragged card, so the computed insert index is literally where
 * the card ends up once it is put back — which lets it be compared directly
 * against the card's current index.
 */
export default function computeCardPlacement(
    targetCards: ICard[],
    cardId: CardId,
    targetCardId: CardId
): number | null {
    const cardsWithoutMovingCard = targetCards.filter(card => card.id !== cardId);
    const targetIndex = cardsWithoutMovingCard.findIndex(card => card.id === targetCardId);
    if (targetIndex === -1)
        return null;

    // -1 while the card still belongs to another list
    const currentIndex = targetCards.findIndex(card => card.id === cardId);

    // dragging down past a card means landing after it, dragging up means before
    const insertIndex = currentIndex !== -1 && currentIndex <= targetIndex
        ? targetIndex + 1
        : targetIndex;

    if (currentIndex === insertIndex)
        return null;

    return computeCardInsertPosition(cardsWithoutMovingCard, insertIndex);
}
