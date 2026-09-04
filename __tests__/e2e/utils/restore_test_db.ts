import client from "@/lib/supabase/client";

export const RESTORE_BOARDS = async () => {
    await client
        .from('boards')
        .update({ name: "Test Board" })
        .eq("id", 15); 
    
    await client
        .from('boards')
        .delete()
        .neq("name", "Test Board");
};

export const RESTORE_LISTS = async () => {
    await client
        .from("lists")
        .update({ name: "Test List 1" })
        .eq("id", 59);

    await client
        .from("lists")
        .delete()
        .gt("id", 61);

    await client
        .from("cards")
        .update({ title: "Test Card 1" })
        .eq('id', 305);

    await client
        .from("cards")
        .update({ position: 1 });

    await client
        .from("cards")
        .update({ list_id: 59 })
        .eq("id", 306);

    await client
        .from("cards")
        .delete()
        .gt('id', 307);
};