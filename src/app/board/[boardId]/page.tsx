// TODO
// add positioning while dragging
// add optimistic updates to cards deletion

// todo pass board: BoardWithLists prop to the <Board /> component
// replace large code in Board.tsx with custom useOptimicticLists hook

// then cover everything with tests
// and add toast errors
import { notFound } from "next/navigation";

import Board from "@/components/Board";
import { getBoard } from "@/lib/supabase/queries";
import Header from "@/components/UI/header/header";

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

    return <>
        <Header name={board.name}/>
        <Board id={boardId} boardLists={board.lists} />
    </>
}