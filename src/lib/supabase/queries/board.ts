import { BoardId } from "@/types/brands";
import client from "../client";
import { BoardWithLists, IBoard, INewBoard } from "@/types";

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

export async function createBoard(name: string) {
    const board: INewBoard = { name };
    
    const { data, error } = await client
        .from('boards')
        .insert(board)
        .select()
        .single();
    
    if (error) 
        throw new Error(`Failed to create board"${name}"`);

    return data;
}

export async function deleteBoard(id: BoardId) {
    const { error } = await client
        .from("boards")
        .delete()
        .eq("id", id);

    if (error) throw new Error(`Failed to delete board`)
}