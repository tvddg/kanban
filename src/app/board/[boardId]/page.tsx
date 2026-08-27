import { notFound } from "next/navigation";

import Board from "@/components/Board";
import { getBoard } from "@/lib/supabase/queries/board";
import Header from "@/components/UI/Header";

interface BoardRouterProps {
    params: Promise<{
        boardId: string;
    }>
}

export default async function BoardRouter({ params }: BoardRouterProps) {
    const boardId = parseInt((await params).boardId);
    if (isNaN(boardId))
        notFound();
    const board = await getBoard(boardId);
    const sortedLists = board.lists
            .map(list => ({
                ...list,
                cards: [...list.cards].sort((c1, c2) => c2.position - c1.position)
            })).sort((li1, li2) => li1.position - li2.position);

    return <>
        <Header name={board.name}/>
        <Board id={boardId} boardLists={sortedLists} />
    </>
}