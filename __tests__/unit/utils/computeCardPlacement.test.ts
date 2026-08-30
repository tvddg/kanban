import computeCardPlacement from "@/utils/computingHelpers/computeCardPlacement";
import { ICard } from "@/types";
import { CardId, ListId } from "@/types/brands";

const card = (id: number, position: number): ICard => ({
    id: id as CardId,
    list_id: 1 as ListId,
    position,
    title: `card ${id}`,
    description: null,
    created_at: "2026-01-01T00:00:00Z"
});

const applyPlacement = (cards: ICard[], cardId: number, position: number): number[] => {
    const moving = cards.find(c => c.id === cardId) ?? card(cardId, position);
    return [
        ...cards.filter(c => c.id !== cardId),
        { ...moving, position }
    ]
        .sort((a, b) => b.position - a.position)
        .map(c => c.id);
};

describe("computeCardPlacement", () => {
    const list = () => [card(1, 300), card(2, 200), card(3, 100)];

    it("puts a card from another list into the hovered card's slot", () => {
        const position = computeCardPlacement(list(), 9 as CardId, 2 as CardId);

        expect(position).not.toBeNull();
        expect(applyPlacement(list(), 9, position!)).toEqual([1, 9, 2, 3]);
    });

    it("drops a card from another list at the top when hovering the first card", () => {
        const position = computeCardPlacement(list(), 9 as CardId, 1 as CardId);

        expect(applyPlacement(list(), 9, position!)).toEqual([9, 1, 2, 3]);
    });

    it("lands after the hovered card when dragging downwards", () => {
        const position = computeCardPlacement(list(), 1 as CardId, 2 as CardId);

        expect(position).not.toBeNull();
        expect(applyPlacement(list(), 1, position!)).toEqual([2, 1, 3]);
    });

    it("reaches the bottom when dragging onto the last card", () => {
        const position = computeCardPlacement(list(), 1 as CardId, 3 as CardId);

        expect(applyPlacement(list(), 1, position!)).toEqual([2, 3, 1]);
    });

    it("lands before the hovered card when dragging upwards", () => {
        const position = computeCardPlacement(list(), 3 as CardId, 2 as CardId);

        expect(applyPlacement(list(), 3, position!)).toEqual([1, 3, 2]);
    });

    it("reaches the top when dragging onto the first card", () => {
        const position = computeCardPlacement(list(), 3 as CardId, 1 as CardId);

        expect(applyPlacement(list(), 3, position!)).toEqual([3, 1, 2]);
    });

    it("keeps moving a card that already sits at the top", () => {
        const position = computeCardPlacement(list(), 1 as CardId, 2 as CardId);

        expect(position).not.toBeNull();
        expect(position).toBeLessThan(300);
    });

    it("reports no move when the card is already in that slot", () => {
        expect(computeCardPlacement(list(), 2 as CardId, 2 as CardId)).toBeNull();
    });

    it("reports no move when the hovered card is not in the list", () => {
        expect(computeCardPlacement(list(), 1 as CardId, 99 as CardId)).toBeNull();
    });
});
