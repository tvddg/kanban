import { ListWithCards } from "@/types";
import { useOptimistic, useState, useTransition } from "react";
import rootReducer from "./reducers";
import getAllHandlers from "./handlers";
import { getBoard } from "@/lib/supabase/queries";

interface UseOptimisticListsProps {
    boardId: number; 
    boardLists: ListWithCards[]; // initial value fetched from DB
}

export default function useOptimisticLists({
    boardId, boardLists
}: UseOptimisticListsProps) {
    // source of truth lists
    const [lists, setLists] = useState(boardLists);

    // optimistic lists
    const [optimisticLists, dispatch] = useOptimistic(lists, rootReducer);

    // define a transition
    const [_, startTransition] = useTransition();

    // define a common source of truth updating function
    const updateLists = async () => {
        const board = await getBoard(boardId);
        const sortedLists = board.lists
            .map(list => ({
                ...list,
                cards: [...list.cards].sort((c1, c2) => c2.position - c1.position)
            })).sort((li1, li2) => li1.position - li2.position);

        setLists(sortedLists);
    }

    // handlers for operations
    const handlers = getAllHandlers(
        dispatch,
        startTransition,
        updateLists
    );

    return { optimisticLists, handlers };
}