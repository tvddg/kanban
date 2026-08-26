import { getAllBoards } from "@/lib/supabase/queries";
import Image from "next/image"
import BoardCard from "./BoardCard";

export default async function BoardSlider() {
    const boards = await getAllBoards();
    return <section className="flex text-2xl flex-col mt-12 p-6 pb-8 rounded-xl bg-linear-to-br from-white/5 to-white/10 shadow-xl border border-white/20 backdrop-blur-md">
        <h2 className="text-3xl pb-3 font-medium">Your boards</h2>
        <div className="flex gap-8 overflow-scroll">
            <div className="flex flex-col gap-2 items-center justify-center shrink-0 grow-0 w-96 h-40 rounded-xl bg-linear-to-br from-white/5 to-white/10 shadow-xl border border-white/20 backdrop-blur-md">
                <p className="color-white">Create new board</p>
                <Image src="/plus_icon.svg" alt="Create new list icon" width={30} height={30} />
            </div>
            {
                boards.map(board => 
                    <BoardCard
                        key={board.id}
                        id={board.id}
                        name={board.name}
                        createdAt={board.created_at} 
                    />
                )
            }
        </div>
    </section>
}