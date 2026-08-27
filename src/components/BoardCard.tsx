"use client";

import { BoardId } from "@/types/brands";
import formatDateString from "@/utils/formatters/formatDateString";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Activity, useState } from "react";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

interface BoardCardProps {
    id: BoardId;
    name: string;
    createdAt: string;
}

export default function BoardCard({ id, name, createdAt }: BoardCardProps) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const formattedCreatedAt = formatDateString(createdAt);
    return <div className="relative min-w-0 flex justify-between p-6 pt-8 pb-8 md:min-w-96 h-40 rounded-xl bg-linear-to-b from-gray-900 to-gray-800 shadow-xl">
        <div
            data-testid={`boardCard-${id}`}
            className="flex min-w-0 flex-1 md:w-1/2 cursor-pointer align-start justify-between"
            onClick={() => router.push(`/board/${id}`)}
        >
            <div className="flex min-w-0 w-full gap-4 flex-col justify-between">
                <p className="min-w-0 font-medium truncate">{name}</p>
                <p className="w-full grow-0 text-sm md:text-lg opacity-60">Created at: {formattedCreatedAt}</p>
            </div>
        </div>
        <Image
            className="text-sm self-start" src="/settings_icon.svg" alt="Settings icon" width={40} height={40}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Activity mode={isMenuOpen ? "visible" : "hidden"}>
            <DropdownMenu 
                items={[
                    { name: "Delete", callback: () => alert(`DELETE BOARD ${id}`), imagePath: "/delete_icon.svg"},
                    { name: "Edit", callback: () => alert(`EDIT BOARD ${id}`), imagePath: "edit_icon.svg"}
                ]}
                closeMenu={() => setIsMenuOpen(false)}
            />
        </Activity>
    </div>
}