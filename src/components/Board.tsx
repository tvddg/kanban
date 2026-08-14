"use client";

import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { PointerSensor, PointerActivationConstraints } from "@dnd-kit/dom"
import List from "./List/List";
import { CardId, ListId } from "@/types/brands";
import { ListWithCards } from "@/types";
import useOptimisticLists from "@/hooks/useOptimisticLists";
import { isSortable } from "@dnd-kit/react/sortable";
import { moveCard, sortCard } from "@/lib/supabase/queries";
import { startTransition } from "react";

interface BoardProps {
    id: number;
    boardLists: ListWithCards[];
}

const CARD_POSITION_GAP = 100.0;
const LIST_DROP_POSITION = 1;

function computeInsertPosition(cardsWithoutMovingCard: { position: number }[], index: number): number {
    if (cardsWithoutMovingCard.length === 0) {
        return CARD_POSITION_GAP;
    }
    if (index === 0) {
        return cardsWithoutMovingCard[0].position + CARD_POSITION_GAP;
    }
    if (index === cardsWithoutMovingCard.length) {
        return cardsWithoutMovingCard[cardsWithoutMovingCard.length - 1].position / 2.0;
    }
    return (cardsWithoutMovingCard[index - 1].position + cardsWithoutMovingCard[index].position) / 2.0;
}

export default function Board({ id, boardLists }: BoardProps) {
    const { optimisticLists, handleAddCard, handleMoveCard, handleDeleteCard, handleEditCard } = useOptimisticLists({ boardId: id, boardLists });

    const handleReorderCard = async (operation: DragEndEvent["operation"]) => {
        const { source } = operation;
        if (!isSortable(source))
            return;

        const { index, initialIndex, group, initialGroup } = source;
        if (group === undefined)
            return;

        const cardId = source.id as CardId;
        const listId = group as ListId;
        const cards = boardLists.find(li => li.id === listId)?.cards;
        if (!cards || cards.length === 0)
            return;

        const isSameList = group === initialGroup;
        const cardsWithoutMovingCard = isSameList
            ? cards.filter((_, cardIndex) => cardIndex !== initialIndex)
            : cards;

        const newPosition = computeInsertPosition(cardsWithoutMovingCard, index);

        if (isSameList) {
            await sortCard(cardId, newPosition);
        } else {
            await moveCard(cardId, listId, newPosition);
        }
    };

    const handleDragEnd = async (e: DragEndEvent) => {
        if (e.canceled)
            return;

        const { source, target } = e.operation;

        if (target?.type === "list") {
            const cardId = source?.id as CardId;
            const sourceListId = source?.data.list_id as ListId;
            const targetListId = target.id as ListId;
            handleMoveCard(cardId, sourceListId, targetListId, LIST_DROP_POSITION);
            return;
        }

        await handleReorderCard(e.operation);
    };

    return <div className="pt-8 flex flex-col justify-start min-h-0 h-10/12">
                <DragDropProvider
                    sensors={(defaults) => [
                        ...defaults.filter((sensor) => sensor !== PointerSensor),
                        PointerSensor.configure({
                            activationConstraints: [new PointerActivationConstraints.Delay({ value: 300, tolerance: 10 })]
                        })
                    ]}
                    onDragEnd={handleDragEnd}
                >
                    <section className="flex items-start text-2xl min-h-0 max-h-full overflow-x-scroll scrollbar-none content-start">
                        {
                            optimisticLists.map(list =>
                                <List
                                    key={list.id}
                                    id={list.id}
                                    name={list.name}
                                    cards={list.cards}
                                    handleAddCard={(position: number, title: string, description?: string) => handleAddCard(list.id, position, title, description)}
                                    handleDeleteCard={(cardId: CardId) => handleDeleteCard(list.id, cardId)}
                                    handleEditCard={(cardId: CardId, title: string) => handleEditCard(list.id, cardId, title)}
                                />
                            )
                        }
                    </section>
                </DragDropProvider>
            </div>
}
