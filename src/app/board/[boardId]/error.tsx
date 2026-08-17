"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface BoardErrorProps {
    error: Error;
    reset: () => void;
}

export default function BoardError({error, reset}: BoardErrorProps) {
    const router = useRouter();
    const reload = () => {
        startTransition(() => {
            router.refresh();
            reset();
        })
    };
    return <div className="flex flex-col gap-4 h-dvh items-center">
        <h1 className="mt-52 text-8xl text-gray-300 font-medium w-6/12 text-center">Something went wrong</h1>
        <div className="flex gap-4">
            <button
                className="text-xl opacity-45 cursor-pointer hover:scale-102 border-gray-300 hover:opacity-100 active:scale-95 transition-all duration-200"
                onClick={reload}
            >Try again</button>
            <button 
                onClick={() => router.replace("/")}
                className="text-xl opacity-45 cursor-pointer hover:scale-102 border-gray-300 hover:opacity-100 active:scale-95 transition-all duration-200"
            >
                To the home page
            </button>
        </div>
        
    </div>
}