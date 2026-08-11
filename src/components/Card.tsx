"use client";

import { ListId, CardId } from "@/types/brands"; 
import { useSortable } from "@dnd-kit/react/sortable";

export interface CardProps {
    id: CardId;
    index: number,
    listId: ListId;
    name: string;
}

export default function Card({ id, index, listId, name }: CardProps) {
    const { ref } = useSortable({
        id,
        index: index,
        group: listId,
        data: {
            list_id: listId
        }
    });

    return <span 
        ref={ref}
        className="border-solid text-ellipsis whitespace-nowrap overflow-clip border-2 shadow-2xs border-cyan-200 rounded-xl p-2 hover:border-cyan-500 hover:scale-100 active:border-cyan-500 active:scale-95 transition duration-200 cursor-pointer">
        {name}
    </span>
}