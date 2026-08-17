import client from "@/lib/supabase/client";

const RESTORE_TEST_DB = async (timestamp: number) => {
    await client
        .from("cards")
        .delete()
        .gt('id', 3);
    
    await client
        .from("cards")
        .update({ title: "Test Card 1" })
        .eq('id', 1);
};

export default RESTORE_TEST_DB;