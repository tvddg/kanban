import client from "./client";
import { BoardWithLists, INewCard, INewList } from "@/types";
import { BoardId, CardId, ListId } from "@/types/brands";

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

export async function addCard(listId: ListId, position: number, title: string, description?: string) {
    const card: INewCard = {
        list_id: listId,
        title,
        position,
        description
    }; 
    
    const { error } = await client
        .from('cards')
        .upsert(card);

    if (error) 
        throw new Error("Could not add a new card");
}

export async function moveCard(cardId: CardId, listId: ListId, position: number) {
    const { error } = await client
        .from('cards')
        .update({ 
            list_id: listId,
            position 
        }).eq('id', cardId);
    
    if (error) 
        throw new Error("Could not move existing card");
}

export async function deleteCard(cardId: CardId) {
    const { error } = await client
        .from('cards')
        .delete()
        .eq('id', cardId);

    if (error)
        throw new Error("Could not delete existing card");
}

export async function updateCard(cardId: CardId, title: string) {
    const { error } = await client
        .from('cards')
        .update({ title })
        .eq('id', cardId);

    if (error)
        throw new Error("Could not update existing card");
}

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