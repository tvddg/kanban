import type { QueryData } from "@supabase/supabase-js";
import client from "./client";

const boardQuery = await client
    .from('boards')
    .select('*, lists(*, cards(*))');

export type BoardWithLists = QueryData<typeof boardQuery>[number]

export async function getBoard(boardId: number) {
    const { data, error } = await client
        .from('boards')
        .select('*, lists(*, cards(*))')
        .eq('id', boardId)
        .single();

    if (error) throw error;
    
    return data;
}