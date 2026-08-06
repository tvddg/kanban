import client from "./client";
import { BoardWithLists, INewCard } from "@/types";
import { ListId } from "@/types/brands";

export async function getBoard(boardId: number) {
    const { data, error } = await client
        .from('boards')
        .select('*, lists(*, cards(*))')
        .eq('id', boardId)
        .single();

    if (error) throw error;

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

    if (error) throw error
}