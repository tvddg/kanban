"use client";

import { BoardId } from "@/types/brands";
import formatDateString from "@/utils/formatDateString";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BoardCardProps {
    id: BoardId;
    name: string;
    createdAt: string;
}

export default function BoardCard({ id, name, createdAt }: BoardCardProps) {
    const router = useRouter();
    
    const formattedCreatedAt = formatDateString(createdAt);
    return <div
        data-testid={`boardCard-${id}`}
        className="flex flex-col cursor-pointer align-start justify-around p-4 shrink-0 grow-0 md:w-96 h-40 rounded-xl bg-linear-to-b from-gray-900 to-gray-800 shadow-xl"
        onClick={() => router.push(`/board/${id}`)}
    >
        <div className="flex justify-between">
            <p className="font-medium">{name}</p>
            <Image className="text-sm" src="/settings_icon.svg" alt="settings icon" width={40} height={40} />
        </div>
        <p className="text-xl opacity-60">Created at: {formattedCreatedAt}</p>
    </div>
}