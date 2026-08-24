import { BoardId, CardId, ListId } from "./brands";
import type { Tables, TablesInsert, TablesUpdate } from "./database";

// Rebrand helper
type Rebrand<Row, Overrides> = Omit<Row, keyof Overrides> & Overrides;

// Atomic types with remapped id's
export type IBoard = Rebrand<Tables<'boards'>, { id: BoardId }>;
export type IList = Rebrand<Tables<'lists'>, { id: ListId, board_id: BoardId }>;
export type ICard = Rebrand<Tables<'cards'>, { id: CardId, list_id: ListId }>

// CRUD-operation types
export type INewCard = Rebrand<TablesInsert<'cards'>, { list_id: ListId }>;
export type ICardUpdate = Rebrand<TablesUpdate<'cards'>, { list_id: ListId }>;
export type INewList = Rebrand<TablesInsert<'lists'>, { board_id: BoardId }>;

// Nested data types
export type ListWithCards = IList & { cards: ICard[] };
export type BoardWithLists = IBoard & { lists: ListWithCards[] };