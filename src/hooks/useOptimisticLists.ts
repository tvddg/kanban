import { addCard, deleteCard, getBoard, moveCard, updateCard } from "@/lib/supabase/queries";
import { ICard, ListWithCards } from "@/types";
import { CardId, ListId } from "@/types/brands";
import { startTransition, useOptimistic, useState } from "react";
import { toast } from "react-toastify";

type ListAction = {
    type: "ADD_CARD",
    payload: { 
        listId: ListId;
        title: string;
        position: number;
        description?: string
    }
} | {
    type: "MOVE_CARD",
    payload: {
        cardId: CardId,
        sourceListId: ListId,
        targetListId: ListId,
        position: number
    }
} | {
    type: "DELETE_CARD",
    payload: {
        listId: ListId,
        cardId: CardId
    }
} | {
    type: "EDIT_CARD",
    payload: {
        listId: ListId,
        cardId: CardId,
        title: string
    }
}

interface UseOptimisticListsProps {
    boardId: number; 
    boardLists: ListWithCards[]; // initial value fetched from DB
}

export default function useOptimisticLists({
    boardId,
    boardLists
}: UseOptimisticListsProps) {
    // State as a source of truth
    const [lists, setLists] = useState<ListWithCards[]>(boardLists);

    // A reducer for optimistic updates
    const reducer = (state: ListWithCards[], action: ListAction) => {
        switch (action.type) {
            case "ADD_CARD": 
            {
                const targetList = state.find(list => list.id === action.payload.listId);
                if (targetList === undefined) {
                    return state;
                }
                const isPresent = targetList.cards.find(card => card.id < 0) !== undefined;
                if (isPresent) {
                    return state;
                }

                const card: ICard = {
                    created_at: (new Date).toLocaleDateString('sv-SE'),
                    description: action.payload.description ?? null,
                    id: Date.now() * -1 as CardId,
                    list_id: action.payload.listId,
                    position: action.payload.position,
                    title: action.payload.title
                } 
                return [
                    ...(state.filter(list => list.id !== targetList.id)),
                    {
                        ...targetList,
                        cards: [
                            ...targetList.cards,
                            card
                        ]
                    }
                ].sort((li1, li2) => li1.position - li2.position);
            } 
            case "MOVE_CARD": {
                const { cardId, sourceListId, targetListId, position } = action.payload;
                let [sourceList, targetList]: ListWithCards[] = [];
                for (const li of state) {
                    if (li.id === sourceListId) {
                        sourceList = li;
                    }
                    if (li.id === targetListId) {
                        targetList = li;
                    }
                }
                if (!sourceList) {
                    throw new Error(`List ${sourceListId} not found`);
                } else if (!targetListId) {
                    throw new Error(`List ${targetListId} not found`);
                }
                const oldCard = sourceList.cards.find(c => c.id === cardId);
                if (oldCard === undefined) {
                    return state;
                }
                const newCard: ICard = {
                    ...oldCard,
                    list_id: targetListId,
                    position
                }

                return [
                    ...state.filter(li => li.id !== sourceListId && li.id !== targetListId),
                    {
                        ...sourceList,
                        cards: sourceList.cards.filter(c => c.id !== oldCard.id)
                    },
                    {
                        ...targetList,
                        cards: [
                            ...targetList.cards,
                            newCard
                        ].sort((c1, c2) => c2.position - c1.position)
                    }
                ].sort((li1, li2) => li1.position - li2.position);
            }
            case "DELETE_CARD": {
                const { cardId, listId } = action.payload;
                const list = state.find(li => li.id === listId);
                if (list === undefined) {
                    return state;
                }
                return [
                    ...state.filter(li => li.id !== list.id),
                    {
                        ...list,
                        cards: list.cards
                            .filter(card => card.id !== cardId)
                            .sort((c1, c2) => c2.position - c1.position)
                    }
                ].sort((li1, li2) => li1.position - li2.position);
            }
            case "EDIT_CARD": {
                const { listId, cardId, title } = action.payload;

                const list = state.find(li => li.id === listId);
                if (list === undefined) return state;

                const card = list.cards.find(card => card.id === cardId);
                if (card === undefined) return state;

                return [
                    ...state.filter(li => li.id !== list.id),
                    {
                        ...list,
                        cards: [
                            ...list.cards.filter(card => card.id !== cardId),
                            {
                                ...card,
                                title
                            }
                        ].sort((c1, c2) => c2.position - c1.position)
                    }
                ].sort((li1, li2) => li1.position - li2.position);
            }
            default: { 
                action satisfies never; 
                return state;
            }
        }
    };
    // Optimistic lists state
    const [optimisticLists, dispatch] = useOptimistic(lists, reducer);

    // Handlers for actions
    const handleAddCard = (listId: ListId, position: number, title: string, description?: string) => {
        startTransition(async () => {
            dispatch({
                type: "ADD_CARD",
                payload: {
                    listId,
                    title,
                    position,
                    description
                }
            });
            
            try {
                await addCard(
                    listId,
                    position,
                    title,
                    description
                );
                setLists((await getBoard(boardId)).lists);
            } catch (err) {
                if (err instanceof Error)
                    toast.error(`Error: ${err.message}`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
            }
        });
    }

    const handleMoveCard = (cardId: CardId, sourceListId: ListId, targetListId: ListId, position: number) => {
        startTransition(async () => {
            dispatch({
                type: "MOVE_CARD",
                payload: {
                    cardId,
                    sourceListId,
                    targetListId,
                    position
                }
            });

            try {
                await moveCard(cardId, targetListId, position);
                setLists((await getBoard(boardId)).lists);
            } catch (err) {
                if (err instanceof Error)
                    toast.error(`Error: ${err.message}`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
            }
        });
    };

    const handleDeleteCard = (listId: ListId, cardId: CardId) => {
        startTransition(async () => {
            dispatch({
                type: "DELETE_CARD",
                payload: {
                    listId,
                    cardId
                }
            });
            try {
                await deleteCard(cardId);
                setLists((await getBoard(boardId)).lists);
            } catch (err) {
                if (err instanceof Error)
                    toast.error(`Error: ${err.message}`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
            }
        });
    }

    const handleEditCard = (listId: ListId, cardId: CardId, title: string) => {
        startTransition(async () => {
            dispatch({
                type: "EDIT_CARD",
                payload: { listId, cardId, title }
            });

            try {
                await updateCard(cardId, title);
                setLists((await getBoard(boardId)).lists);
            } catch (err) {
                if (err instanceof Error)
                    toast.error(`Error: ${err.message}`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
            }
        });
    }

    // Return optimistic state and handlers
    return { optimisticLists, handleAddCard, handleMoveCard, handleDeleteCard, handleEditCard };
}