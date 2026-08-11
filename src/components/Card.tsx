"use client";

import { ListId, CardId } from "@/types/brands"; 
import { useSortable } from "@dnd-kit/react/sortable";
import Image from "next/image";

export interface CardProps {
    id: CardId;
    index: number,
    listId: ListId;
    name: string;
    handleDeleteCard: () => void;
}

export default function Card({ id, index, listId, name, handleDeleteCard }: CardProps) {
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
        className="flex justify-between border-solid text-ellipsis whitespace-nowrap overflow-clip border-2 shadow-2xs border-cyan-200 rounded-xl p-2 hover:border-cyan-500 hover:scale-100 active:border-cyan-500 active:scale-95 transition duration-200 cursor-pointer">
        {name}
        <Image alt="Delete icon" src="/delete_icon.svg" 
            width={30} height={30}
            className="cursor-pointer hover:scale-102 transition duration-75"
            onClick={handleDeleteCard}
        />
    </span>
}