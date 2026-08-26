import { INewCard } from "@/types";
import { CardId, ListId } from "@/types/brands";
import client from "../client";

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