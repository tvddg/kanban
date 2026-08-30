const POSITION_BUFFER_VAL = 100.0;

export default function computeCardInsertPosition(cardsWithoutMovingCard: { position: number }[], index: number): number {
    if (cardsWithoutMovingCard.length === 0) {
        return POSITION_BUFFER_VAL;
    }
    if (index === 0) {
        return cardsWithoutMovingCard[0]
        .position + POSITION_BUFFER_VAL;
    }
    if (index === cardsWithoutMovingCard.length) {
        return cardsWithoutMovingCard[
            cardsWithoutMovingCard.length - 1
        ].position / 2.0;
    }
    return (
        cardsWithoutMovingCard[index - 1]
        .position + cardsWithoutMovingCard[index].position) 
        / 2.0;
}