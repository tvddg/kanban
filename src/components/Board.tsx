"use client";

import List from "./List";
import { BoardId, CardId } from "@/types/brands";
import { ListWithCards } from "@/types";
import useOptimisticLists from "@/hooks/useOptimisticLists";
import NewList from "./modals/NewList";
import DndCardsProvider from "./providers/DndCardsProvider";

interface BoardProps {
    id: number;
    boardLists: ListWithCards[];
}

export default function Board({ id, boardLists }: BoardProps) {
    const { optimisticLists, handlers, refreshLists } = useOptimisticLists({ boardId: id, boardLists });

    return <div className="pt-8 flex flex-col justify-start min-h-0 h-10/12">
        <DndCardsProvider
            boardLists={optimisticLists}
            refreshLists={refreshLists}
            handlers={{
                previewMoveCard: handlers.previewMoveCard,
                commitCardPosition: handlers.commitCardPosition
            }}
        >
            <section className="flex items-start text-2xl min-h-0 max-h-full overflow-x-scroll scrollbar-none content-start">
                {
                    optimisticLists.map(list =>
                        <List
                            key={list.id}
                            id={list.id}
                            name={list.name}
                            cards={list.cards}
                            handleAddCard={(position: number, title: string, description?: string) => handlers.addCard({ listId: list.id, position, title, description })}
                            handleDeleteCard={(cardId: CardId) => handlers.deleteCard({ listId: list.id, cardId })}
                            handleEditCard={(cardId: CardId, title: string) => handlers.editCard({ listId: list.id, cardId, title })}
                            handleDeleteList={() => handlers.deleteList({ id: list.id })}
                        />
                    )
                }
                <NewList createList={(name: string) => handlers.createList({
                    boardId: id as BoardId, name, position: (optimisticLists.length
                        ? (optimisticLists.at(-1)?.position ?? 0) + 1
                        : 1)
                })} />
            </section>
        </DndCardsProvider>
    </div>
}
