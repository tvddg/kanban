import client from "./client";
import { BoardWithLists, IBoard } from "@/types";

export async function getBoard(boardId: number) {
    const { data, error } = await client
        .from('boards')
        .select('*, lists(*, cards(*))')
        .eq('id', boardId)
        .single();

    if (error?.code === "PGRST116") 
        throw new Error("The board is not accessible");

    return data as BoardWithLists;
}

export async function getAllBoards() {
    const { data, error } = await client
        .from("boards")
        .select('*');
    
    if (error) throw new Error("Failed to fetch boards");
    
    return data as IBoard[];
}