import client from "@/lib/supabase/client";

const RESTORE_TEST_DB = async () => {
    await client
        .from("cards")
        .delete()
        .gt('id', 3);

    await client
        .from('boards')
        .delete()
        .gt("id", 1);

    await client
        .from("lists")
        .delete()
        .gt("id", 2);
    
    await client
        .from("cards")
        .update({ title: "Test Card 1" })
        .eq('id', 1);
    await client
        .from("cards")
        .update({ position: 1 });
    await client
        .from("cards")
        .update({ list_id: 1 })
        .eq("id", 2);
};

export default RESTORE_TEST_DB;