"use client";

import { useDraggable } from "@dnd-kit/react"; 

interface ItemProps {
    name: string;
}

export default function Item({ name }: ItemProps) {
    const { ref } = useDraggable({
        id: name
    });

    return <span 
        ref={ref}
        className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600 hover:border-cyan-500 hover:scale-103 active:border-cyan-500 active:scale-95 transition duration-200 cursor-pointer">
        {name}
    </span>
}