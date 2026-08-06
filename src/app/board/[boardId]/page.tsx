// TODO
// fix the problem with card stretching
// add suspense with loading circle when the board page is loading
// add optimistic updates to card dragging
// add optimistic updates to cards deletion

// then cover everything with tests
import { notFound } from "next/navigation";

import Board from "@/components/Board";
import { getBoard } from "@/lib/supabase/queries";

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

    return <Board id={boardId} boardLists={board.lists} />
}