"use client";

import { ListId, CardId } from "@/types/brands"; 
import { useSortable } from "@dnd-kit/react/sortable";
import Image from "next/image";
import { useState } from "react";

interface CardProps {
    id: CardId;
    index: number;
    listId: ListId;
    title: string;
    handleDeleteCard: () => void;
    handleEditCard: (title: string) => void;
}

export default function Card({ id, index, listId, title, handleDeleteCard, handleEditCard }: CardProps) {
    const { ref } = useSortable({
        id,
        index: index,
        group: listId,
        data: {
            list_id: listId,
            title
        }
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [cardTitle, setCardTitle] = useState(title);

    return (
        isEditing 
        ? <span
            className="flex gap-2 justify-between border-solid text-ellipsis whitespace-nowrap overflow-clip border-2 shadow-2xs border-cyan-200 rounded-xl p-2 hover:border-cyan-500 hover:scale-100 active:border-cyan-500 active:scale-95 transition duration-200 cursor-pointer"
        >
            <input
                type="text" 
                className="w-full outline-none border-2 rounded-lg pl-1 border-cyan-200"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
            />
            <div className="flex gap-2">
                <button
                    className="cursor-pointer hover:scale-102 transition duration-75"
                    disabled={cardTitle.length === 0}
                    onClick={() => {
                        setIsEditing(false);
                        handleEditCard(cardTitle);
                    }}
                >OK</button>
                <button
                    className="cursor-pointer hover:scale-102 transition duration-75"
                    onClick={() => setIsEditing(false)}
                >Back</button>
            </div>
        </span>
        : <span 
            ref={ref}
            className="flex justify-between border-solid text-ellipsis whitespace-nowrap overflow-clip border-2 shadow-2xs border-cyan-200 rounded-xl p-2 hover:border-cyan-500 active:border-cyan-500 active:scale-95 transition duration-200 cursor-pointer"
            data-testid={`card_${id}`}
        >
            {title}
            <div className="flex gap-1.5">
                <Image alt="Edit icon" src="/edit_icon.svg"
                    width={23} height={23}
                    className="cursor-pointer hover:scale-102 transition duration-75"
                    onClick={() => setIsEditing(true)}
                />
                <Image alt="Delete icon" src="/delete_icon.svg" 
                    width={30} height={30}
                    className="cursor-pointer hover:scale-102 transition duration-75"
                    onClick={handleDeleteCard}
                />
            </div>
        </span>)
}