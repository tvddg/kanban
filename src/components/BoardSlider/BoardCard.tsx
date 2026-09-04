"use client";

import { BoardId } from "@/types/brands";
import formatDateString from "@/utils/formatters/formatDateString";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Activity, useState } from "react";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import Loader from "@/components/UI/Loader";
import { cbDeleteBoard } from "./handlers/deleteBoard";
import RenameBoard from "@/components/modals/editModals/RenameBoard";

interface BoardCardProps {
    id: BoardId;
    name: string;
    createdAt: string;
}

export default function BoardCard({ id, name, createdAt }: BoardCardProps) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isRenamingBoard, setIsRenamingBoard] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const formattedCreatedAt = formatDateString(createdAt);
    return <div 
        data-testid={`boardCardWrapper`}
        className="relative min-w-0 flex justify-between p-6 pt-8 pb-8 md:min-w-96 h-40 rounded-xl bg-linear-to-b from-gray-900 to-gray-800 shadow-xl">
        {
            isPending
            ? <div className="absolute inset-0 flex items-center justify-center">
                <Loader className={"size-12"} />
            </div>
            : <>
                <div
                    data-testid={`boardCard-${id}`}
                    className="flex min-w-0 flex-1 md:w-1/2 cursor-pointer align-start justify-between"
                    onClick={() => !isRenamingBoard && router.push(`/board/${id}`)}
                >
                    <div className="flex min-w-0 w-full gap-4 flex-col justify-between">
                        {
                            isRenamingBoard
                            ? <RenameBoard id={id} submitDisabled={isPending} 
                                setPending={(val: boolean) => setIsPending(val)}
                                refresh={() => router.refresh()} 
                                closeForm={() => setIsRenamingBoard(false)}
                            />
                            : <p className="min-w-0 font-medium truncate">{name}</p>}
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
                            {
                                name: "Delete", callback: () => cbDeleteBoard({
                                    id,
                                    refresh: () => router.refresh(),
                                    setLoading: (val: boolean) => setIsPending(val),
                                    closeMenu: () => setIsMenuOpen(false)
                                }), imagePath: "/delete_icon.svg"
                            },
                            { name: "Rename", callback: () => setIsRenamingBoard(true), imagePath: "edit_icon.svg" }
                        ]}
                        closeMenu={() => setIsMenuOpen(false)}
                    />
                </Activity>
            </>
        }
    </div>
}