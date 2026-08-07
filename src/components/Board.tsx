"use client";

import { DragDropProvider } from "@dnd-kit/react";
import List from "./List";
import { CardId, ListId } from "@/types/brands";
import { ICard, ListWithCards } from "@/types";
import { useOptimistic, startTransition, useState } from "react";
import { addCard, getBoard, moveCard } from "@/lib/supabase/queries";

export type ListAction = {
    type: "ADD_CARD",
    payload: { 
        listId: ListId;
        title: string;
        position: number;
        description?: string
    }
} | {
    type: "MOVE_CARD",
    payload: {
        cardId: CardId,
        sourceListId: ListId,
        targetListId: ListId,
        position: number
    }
}

interface BoardProps {
    id: number;
    boardLists: ListWithCards[];
}

export default function Board({ id, boardLists }: BoardProps) {
    const [lists, setLists] = useState<ListWithCards[]>(boardLists);
    const [optimisticLists, dispatch] = useOptimistic(lists, (state, action: ListAction) => {
        switch (action.type) {
            case "ADD_CARD": 
            {
                const targetList = state.find(list => list.id === action.payload.listId);
                if (targetList === undefined) {
                    return state;
                }
                const card: ICard = {
                    created_at: (new Date).toLocaleDateString('sv-SE'),
                    description: action.payload.description ?? null,
                    id: Date.now() as CardId,
                    list_id: action.payload.listId,
                    position: action.payload.position,
                    title: action.payload.title
                } 
                return [
                    ...(state.filter(list => list.id !== targetList.id)),
                    {
                        ...targetList,
                        cards: [
                            ...targetList.cards,
                            card
                        ]
                    }
                ].sort((li1, li2) => li1.position - li2.position);
            } 
            case "MOVE_CARD": {
                const { cardId, sourceListId, targetListId, position } = action.payload;
                let [sourceList, targetList]: ListWithCards[] = [];
                for (let li of state) {
                    if (li.id === sourceListId) {
                        sourceList = li;
                    }
                    if (li.id === targetListId) {
                        targetList = li;
                    }
                }
                if (!sourceList) {
                    throw new Error(`List ${sourceListId} not found`);
                } else if (!targetListId) {
                    throw new Error(`List ${targetListId} not found`);
                }
                const oldCard = sourceList.cards.find(c => c.id === cardId);
                if (oldCard === undefined) {
                    return state;
                }
                const newCard: ICard = {
                    ...oldCard,
                    list_id: targetListId,
                    position
                }

                return [
                    ...state.filter(li => li.id !== sourceListId && li.id !== targetListId),
                    {
                        ...sourceList,
                        cards: sourceList.cards.filter(c => c.id !== oldCard.id)
                    },
                    {
                        ...targetList,
                        cards: [
                            ...targetList.cards,
                            newCard
                        ].sort((c1, c2) => c2.position - c1.position)
                    }
                ].sort((li1, li2) => li1.position - li2.position);
            }
            default: 
                return state; 
        }
    });

    const handleAddCard = (listId: ListId, position: number, title: string, description?: string) => {
        startTransition(async () => {
            dispatch({
                type: "ADD_CARD",
                payload: {
                    listId,
                    title,
                    position,
                    description
                }
            });
            
            await addCard(
                listId,
                position,
                title,
                description
            );
            setLists((await getBoard(id)).lists);
        });
    }

    const handleMoveCard = (cardId: CardId, sourceListId: ListId, targetListId: ListId, position: number) => {
        startTransition(async () => {
            dispatch({
                type: "MOVE_CARD",
                payload: {
                    cardId,
                    sourceListId,
                    targetListId,
                    position
                }
            });

            await moveCard(cardId, targetListId, position);
            setLists((await getBoard(id)).lists)
        });
    };

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