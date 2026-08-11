"use client";

import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { PointerSensor, PointerActivationConstraints } from "@dnd-kit/dom"
import List from "./List";
import { CardId, ListId } from "@/types/brands";
import { ListWithCards } from "@/types";
import useOptimisticLists from "@/hooks/useOptimisticLists";
import { isSortable } from "@dnd-kit/react/sortable";
import { moveCard, sortCard } from "@/lib/supabase/queries";

interface BoardProps {
    id: number;
    boardLists: ListWithCards[];
}

export default function Board({ id, boardLists }: BoardProps) {
    const handleDragEnd = (e: DragEndEvent) => {
        if (e.canceled) 
            return;
        const { source, target } = e.operation;

        if (target?.type === "list") {
            const cardId = source?.id as CardId;
            const sourceListId = source?.data.list_id as ListId;
            const targetListId = target.id as ListId;
            const position = 1;
            handleMoveCard(cardId, sourceListId, targetListId, position);
        }

        if (isSortable(source)) {
            const { index, initialIndex, group, initialGroup } = source;
            if (group === initialGroup && group !== undefined) {
                const cardId = source?.id as CardId;
                const listId = group as ListId;
                const cards = boardLists.find(li => li.id === listId)?.cards;
                if (cards === undefined || cards.length === 0)
                    return;
                
                if (index === 0) {
                    const maxCardPosition = cards.at(0)!.position;
                    sortCard(cardId, maxCardPosition + 100.0);
                } else if (index === cards.length - 1) {
                    const minCardPosition = cards.at(-1)!.position;
                    sortCard(cardId, minCardPosition / 2.0);
                } else {
                    const [sortingCard] = cards?.splice(initialIndex, 1);
                    cards?.splice(index, 0, sortingCard);
                    const cardsAround = cards?.slice(index - 1, index + 2);
                    cardsAround.splice(1, 1);

                    const newPosition = cardsAround.reduce((acc, card) => 
                        acc + card.position, 0) / 2.0;
                    sortCard(cardId, newPosition);
                }
            } else {
                const cardId = source?.id as CardId;
                const listId = group as ListId;
                const cards = boardLists.find(li => li.id === listId)?.cards;
                if (cards === undefined || cards.length === 0)
                    return;
                
                if (index === 0) {
                    const maxCardPosition = cards.at(0)!.position;
                    moveCard(cardId, listId, maxCardPosition + 100.0);
                } else if (index === cards.length) {
                    const minCardPosition = cards.at(-1)!.position;
                    moveCard(cardId, listId, minCardPosition / 2.0);
                } else {
                    const fooCard = cards.at(0)!;
                    cards.splice(index, 0, fooCard);
                    const cardsAround = cards?.slice(index - 1, index + 2);
                    cardsAround.splice(1, 1);

                    const newPosition = cardsAround.reduce((acc, card) => 
                        acc + card.position, 0) / 2.0;
                    moveCard(cardId, listId, newPosition);
                }
            }
        }
    };

    const { optimisticLists, handleAddCard, handleMoveCard } = useOptimisticLists({ boardId: id, boardLists });
    return <div className="pt-8 flex flex-col justify-start min-h-0 h-212">
                <DragDropProvider
                    sensors={(defaults) => [
                        ...defaults.filter((sensor) => sensor !== PointerSensor),
                        PointerSensor.configure({
                            activationConstraints: [new PointerActivationConstraints.Delay({ value: 300, tolerance: 10 })]
                        })
                    ]}
                    onDragEnd={handleDragEnd}
                >
                    <section className="flex items-start text-2xl min-h-0 max-h-dvh overflow-x-scroll scrollbar-none content-start">
                        {
                            optimisticLists.map(list =>
                                <List 
                                    key={list.id}
                                    id={list.id}
                                    name={list.name} 
                                    cards={list.cards}
                                    handleAddCard={(position: number, title: string, description?: string) => handleAddCard(list.id, position, title, description)}
                                />
                            )
                        }
                    </section>
                </DragDropProvider>
            </div>
}