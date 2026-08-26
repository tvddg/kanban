import { CardId } from "@/types/brands";
import { DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { ListWithCards } from "@/types";
import { UnitedHandlers } from "@/hooks/useOptimisticLists/handlers";

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
        refreshLists();
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
