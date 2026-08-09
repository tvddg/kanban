"use client";

import { DragDropProvider } from "@dnd-kit/react";
import List from "./List";
import { CardId, ListId } from "@/types/brands";
import { ListWithCards } from "@/types";
import useOptimisticLists from "@/hooks/useOptimisticLists";

interface BoardProps {
    id: number;
    boardLists: ListWithCards[];
}

export default function Board({ id, boardLists }: BoardProps) {
    const { optimisticLists, handleAddCard, handleMoveCard } = useOptimisticLists({ boardId: id, boardLists });
    return <div className="pt-8 flex flex-col justify-start min-h-0 h-212">
                <DragDropProvider
                    onDragEnd={(e) => {
                        if (e.canceled) 
                            return;
                        const cardId = e.operation.source?.id as CardId;
                        const sourceListId = e.operation.source?.data.list_id;
                        const targetListId = e.operation.target?.id as ListId;
                        const position = 1; // TODO
                        if (sourceListId === targetListId)
                            return;
                        handleMoveCard(cardId, sourceListId, targetListId, position);
                    }}
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