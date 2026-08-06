declare const __brand: unique symbol;

type Brand<T, B extends string> = T & {
    [__brand]: B
}

export type CardId = Brand<string, "cardId">;
export type ListId = Brand<string, "listId">;