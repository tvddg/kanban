"use client";

import { BoardId } from "@/types/brands";
import formatDateString from "@/utils/formatDateString";
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
    return <div className="relative flex justify-between p-6 pt-8 pb-8 md:w-96 h-40 rounded-xl bg-linear-to-b from-gray-900 to-gray-800 shadow-xl">
        <div
            data-testid={`boardCard-${id}`}
            className="flex cursor-pointer align-start justify-between shrink-0 grow-0 "
            onClick={() => router.push(`/board/${id}`)}
        >
            <div className="flex flex-col justify-between">
                <p className="font-medium">{name}</p>
                <p className="text-xl opacity-60">Created at: {formattedCreatedAt}</p>
            </div>
        </div>
        <Image
            className="text-sm self-start" src="/settings_icon.svg" alt="Settings icon" width={40} height={40}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Activity mode={isMenuOpen ? "visible" : "hidden"}>
            <DropdownMenu 
                items={[
                    { name: "Delete", callback: () => alert(`DELETE BOARD ${id}`)},
                    { name: "Edit", callback: () => alert(`EDIT BOARD ${id}`)}
                ]}
                closeMenu={() => setIsMenuOpen(false)}
            />
        </Activity>
    </div>
}