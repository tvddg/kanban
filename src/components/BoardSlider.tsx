import { getAllBoards } from "@/lib/supabase/queries/board";
import BoardCard from "./BoardCard";
import NewBoard from "./modals/NewBoard";

export default async function BoardSlider() {
    const boards = await getAllBoards();
    return <section className="flex text-2xl flex-col mt-6 md:mt-12 p-6 pb-8 rounded-xl bg-linear-to-br from-white/5 to-white/10 shadow-xl border border-white/20 backdrop-blur-md max-h-6/7">
        <h2 className="text-3xl pb-3 font-medium">Your boards</h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 overflow-scroll max-h-full scrollbar-none">
            <NewBoard />
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