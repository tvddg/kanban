"use client";

import { DragDropProvider } from "@dnd-kit/react";
import List from "./List";
import { CardId, ListId } from "@/types/brands";
import { ICard, ListWithCards } from "@/types";
import { useOptimistic, startTransition, useState } from "react";
import { addCard, getBoard } from "@/lib/supabase/queries";

export type ListAction = {
    type: "ADD_CARD",
    payload: { 
        listId: ListId;
        title: string;
        position: number;
        description?: string
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
        }
    });

    // TODO pass down to list components
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
            const newLists = (await getBoard(id)).lists;
            setLists(newLists);
        });
    }

    return <div className="pt-8 flex flex-col justify-start min-h-0 h-212">
                <DragDropProvider
                    onDragEnd={(e) => {
                        if (e.canceled) 
                            return;
                        // TODO optimistic UI update with supabase request
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