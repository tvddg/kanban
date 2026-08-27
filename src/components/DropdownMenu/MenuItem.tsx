"use client";

interface MenuItemProps {
    name: string;
    callback: () => void;
}

export default function MenuItem(
    { name, callback }: MenuItemProps
) {
    return <button 
        className="w-full text-left rounded-lg hover:bg-white/20"
        onClick={() => callback()}
    >
        {name}
    </button>
}