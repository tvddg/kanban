import client from "./client";
import { BoardWithLists, INewCard } from "@/types";
import { CardId, ListId } from "@/types/brands";

export async function getBoard(boardId: number) {
    const { data, error } = await client
        .from('boards')
        .select('*, lists(*, cards(*))')
        .eq('id', boardId)
        .single();

    if (error) 
        throw new Error(error.message);

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
        throw new Error(error.message);
}

export async function moveCard(cardId: CardId, listId: ListId, position: number) {
    const { error } = await client
        .from('cards')
        .update({ 
            list_id: listId,
            position 
        }).eq('id', cardId);
    
    if (error) 
        throw new Error(error.message);
}