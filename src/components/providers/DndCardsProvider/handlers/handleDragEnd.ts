import { CardId } from "@/types/brands";
import { DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { ListWithCards } from "@/types";
import { UnitedHandlers } from "@/hooks/useOptimisticLists/handlers";

/**
 * By the time the drop happens the card already sits in its final place in
 * local state — handleDragOver put it there. So there is nothing to reorder
 * here, only the database write.
 */
export default function handleDragEnd(
    e: DragEndEvent,
    boardLists: ListWithCards[],
    commitCardPosition: UnitedHandlers["commitCardPosition"],
    refreshLists: () => Promise<void>
) {
    const { source } = e.operation;
    if (!isSortable(source))
        return;

    if (e.canceled) {
        // the preview already moved the card, so drop it and take the server's word
        void refreshLists();
        return;
    }

    const cardId = source.id as CardId;

    const list = boardLists.find(
        li => li.cards.some(card => card.id === cardId)
    );
    const card = list?.cards.find(c => c.id === cardId);
    if (!list || !card)
        return;

    commitCardPosition({ cardId, listId: list.id, position: card.position });
}
