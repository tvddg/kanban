import { BoardId, CardId, ListId } from "@/types/brands";

export type CardAction = {
    type: "ADD_CARD",
    payload: { 
        cardId: CardId;
        createdAt: string;
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

export type ListAction = {
    type: "CREATE_LIST",
    payload: {
        listId: ListId;
        createdAt: string;
        boardId: BoardId;
        name: string;
        position: number;
    }
} | {
    type: "DELETE_LIST",
    payload: {
        id: ListId
    }
}

// TYPE GUARDS for actions
export function isCardAction(action: any): action is CardAction {
    if (!action || !(typeof action === "object") 
        || !("type" in action && "payload" in action)) {
        return false;
    }

    const cardActionTypes: Record<CardAction["type"], boolean> = {
        ADD_CARD: true,
        MOVE_CARD: true,
        DELETE_CARD: true,
        EDIT_CARD: true
    };

    return action.type in cardActionTypes;
}

export function isListAction(action: any): action is ListAction {
    if (!action || !(typeof action === "object") 
        || !("type" in action && "payload" in action)) {
        return false;
    }

    const listActionTypes: Record<ListAction["type"], boolean> = {
        CREATE_LIST: true,
        DELETE_LIST: true
    };

    return action.type in listActionTypes;
}