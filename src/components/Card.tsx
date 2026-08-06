"use client";

import { ListId, CardId } from "@/types/brands";
import { useDraggable } from "@dnd-kit/react"; 

export interface CardProps {
    id: CardId;
    listId: ListId;
    name: string;
}

export default function Card({ id, name }: CardProps) {
    const { ref } = useDraggable({
        id
    });

    return <span 
        ref={ref}
        className="border-solid text-ellipsis whitespace-nowrap overflow-clip border-2 shadow-2xs border-cyan-200 rounded-xl p-2 hover:border-cyan-500 hover:scale-100 active:border-cyan-500 active:scale-95 transition duration-200 cursor-pointer">
        {name}
    </span>
}