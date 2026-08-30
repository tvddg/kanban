import { INewList } from "@/types";
import { BoardId, ListId } from "@/types/brands";
import client from "../client";

export async function createList(boardId: BoardId, name: string, position: number) {
    const newList: INewList = {
        board_id: boardId,
        name,
        position
    };
    
    const { error } = await client
        .from("lists")
        .upsert(newList);

    if (error) {
        throw new Error("Could not create new list");
    } 
}

export async function deleteList(id: ListId) {
    const { error } = await client
        .from("lists")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(`Could not delete list ${id}`);
    }
}