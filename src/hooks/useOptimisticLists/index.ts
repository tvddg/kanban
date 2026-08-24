import { ListWithCards } from "@/types";
import { useOptimistic, useState } from "react";
import rootReducer from "./reducers";
import getAllHandlers from "./handlers";
import { BoardId } from "@/types/brands";

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

    // handlers for operations
    const handlers = getAllHandlers(
        dispatch,
        boardId as BoardId, 
        setLists
    );

    return { optimisticLists, handlers };
}