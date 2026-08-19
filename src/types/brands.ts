declare const __brand: unique symbol;

type Brand<T, B extends string> = T & {
    [__brand]: B
}

export type CardId = Brand<number, "cardId">;
export type ListId = Brand<number, "listId">;
export type BoardId = Brand<number, "boardId">;