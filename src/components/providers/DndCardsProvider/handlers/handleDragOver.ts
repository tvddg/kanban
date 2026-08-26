import { UnitedHandlers } from "@/hooks/useOptimisticLists/handlers";
import { ListWithCards } from "@/types";
import { CardId, ListId } from "@/types/brands";
import computeCardPlacement from "@/utils/computeCardPlacement";
import { DragOverEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";

const LIST_DROP_POSITION = 1;

/**
 * Keeps local state in step with the pointer for the whole drag.
 *
 * This is what stops dnd-kit from rearranging the DOM behind React's back: its
 * OptimisticSortingPlugin only reorders elements itself when it finds that
 * React has not already applied the new order.
 */
export default function handleDragOver(
    e: DragOverEvent,
    boardLists: ListWithCards[],
    previewMoveCard: UnitedHandlers["previewMoveCard"]
) {
    const { source, target } = e.operation;
    if (!isSortable(source) || !target)
        return;

    const cardId = source.id as CardId;

    // where the card sits right now according to state, which is the only
    // reliable source list — dnd-kit may already have moved its own group
    const currentList = boardLists.find(
        list => list.cards.some(card => card.id === cardId)
    );
    if (!currentList)
        return;

    if (target.type === "list") {
        const targetListId = target.id as ListId;
        if (currentList.id === targetListId)
            return;

        previewMoveCard({
            cardId,
            sourceListId: currentList.id,
            targetListId,
            position: LIST_DROP_POSITION
        });
        return;
    }

    if (!isSortable(target) || target.id === cardId)
        return;

    const targetListId = target.group as ListId;
    if (targetListId === undefined)
        return;

    const targetList = boardLists.find(list => list.id === targetListId);
    if (!targetList)
        return;

    const position = computeCardPlacement(
        targetList.cards, cardId, target.id as CardId
    );
    if (position === null)
        return;

    previewMoveCard({
        cardId,
        sourceListId: currentList.id,
        targetListId,
        position
    });
}
