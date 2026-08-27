"use client";

import { createBoard } from "@/lib/supabase/queries/board";
import showToastError from "@/utils/showToastError";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function NewBoard() {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [isRequestSent, setIsRequestSent] = useState(false);
    const {
        register,
        handleSubmit,
        reset
    } = useForm<{ name: string }>();

    const onSubmit: SubmitHandler<{ name: string }> = async ({ name }) => {
        try {
            setIsRequestSent(true);
            const { id } = await createBoard(name);
            router.push(`board/${id}`)
        } catch (err) {
            if (err instanceof Error) {
                showToastError(err.message)
            } else {
                showToastError();
            }
            reset();
            setIsCreating(false);
            setIsRequestSent(false);
        }
    };

    return isCreating
        ? <form 
            name="New board form"
            data-testid="createNewBoardForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-center justify-center shrink-0 grow-0 md:w-96 h-40 rounded-xl bg-linear-to-br from-white/5 to-white/10 border shadow-xl border-white/20 backdrop-blur-md"
        >
            <input
                {...register('name', { required: true })}
                placeholder="Type name..."
                className="p-0.5 pl-1.5 focus:outline-none focus:from-white/15 focus:to-white/20 rounded-xl bg-linear-to-br from-white/5 to-white/10 border shadow-md border-white/20 backdrop-blur-md"
            />
            <div className="w-1/2 flex justify-between">
                <button 
                    type="submit"
                    className="p-0.5 pl-1.5 pr-1.5 focus:outline-none focus:from-white/15 focus:to-white/20 rounded-xl bg-linear-to-br from-white/5 to-white/10 border shadow-md border-white/20 backdrop-blur-md"
                    disabled={isRequestSent}
                   >
                        OK
                </button>
                <button 
                    type="button"
                    className="p-0.5 pl-1.5 pr-1.5 focus:outline-none focus:from-white/15 focus:to-white/20 rounded-xl bg-linear-to-br from-white/5 to-white/10 border shadow-md border-white/20 backdrop-blur-md"
                    onClick={() => setIsCreating(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
        : <div
            data-testid="createNewBoardPanel"
            className="cursor-pointer flex flex-col gap-2 items-center justify-center shrink-0 grow-0 md:w-96 h-40 rounded-xl bg-linear-to-br from-white/5 to-white/10 border shadow-xl border-white/20 backdrop-blur-md"
            onClick={() => setIsCreating(true)}
        >
            <p className="color-white">Create new board</p>
            <Image src="/plus_icon.svg" alt="Create new board icon" width={30} height={30} />
        </div>
}