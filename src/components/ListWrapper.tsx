"use client";

import { DragDropProvider } from "@dnd-kit/react";
import List, { ListProps } from "./List";
import { CardId, ListId } from "@/types/brands";

interface ListWrapperProps {
    lists: ListProps[],
    addCard: (name: string, listId: ListId) => void;
    dragCard: (cardId: CardId, listToId: ListId, listFromId: ListId) => void;
}

export default function ListWrapper({ lists, addCard, dragCard }: ListWrapperProps) {
    return <div className="pt-8 flex flex-col justify-start shrink-0 h-full">
                <DragDropProvider
                    onDragEnd={(e) => {
                        if (e.canceled) 
                            return;
                        const listFromId = lists.find(list => 
                            list.cards.find(card => 
                                card.id === (e.operation.source?.id as CardId)) 
                            !== undefined
                        )?.id;

                        if (listFromId === undefined) {
                            console.error(`Couldn't clarify the list of a card [${e.operation.source?.id}]`);
                            return;
                        }

                        dragCard(
                            e.operation.source?.id as CardId,
                            e.operation.target?.id as ListId,
                            listFromId
                        );
                    }}
                >
                    <section className="flex text-3xl h-auto max-h-6/12 overflow-x-scroll scrollbar-none content-start">
                        {
                            lists.map(list =>
                                <List 
                                    key={list.id}
                                    id={list.id}
                                    name={list.name} 
                                    cards={list.cards}
                                    addCard={(name: string) => addCard(name, list.id)}
                                />
                            )
                        }
                    </section>
                </DragDropProvider>
            </div>
}