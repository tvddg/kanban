"use client";

import Image from "next/image";

interface MenuItemProps {
    name: string;
    imagePath: string;
    callback: () => void;
}

export default function MenuItem(
    { name, callback, imagePath }: MenuItemProps
) {
    return <button 
        className="w-full p-0.5 flex items-center gap-2 rounded-lg justify-start hover:bg-white/20"
        onClick={() => callback()}
    >
        <Image src={imagePath} alt={`Menu item: ${name}`} width={20} height={20} />
        <p className="text-left">{name}</p>
    </button>

}