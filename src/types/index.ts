import type { Database } from "./database";

type Tables = Database["public"]["Tables"];

export type Board = Tables["boards"]["Row"];
export type List = Tables["lists"]["Row"];
export type Card = Tables["cards"]["Row"];

export type NewCard = Tables["cards"]["Insert"];
export type CardUpdate = Tables["cards"]["Update"];