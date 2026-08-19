"use client";

import { CardId, ListId } from "@/types/brands";
import Card from "../Card";
import { useDroppable } from "@dnd-kit/react";
import { useState } from "react";
import ListModal from "./ListModal";
import { ICard } from "@/types";

export interface ListProps {
    id: ListId;
    name: string;
    cards: ICard[];
    handleAddCard: (position: number, title: string,
        description?: string) => void;
    handleDeleteCard: (cardId: CardId) => void;
    handleEditCard: (cardId: CardId, title: string) => void;
}

export default function List({ id, name, cards, handleAddCard, handleDeleteCard, handleEditCard }: ListProps) {
    const { ref } = useDroppable({
        id,
        type: "list"
    });

    let newCardPosition = 1;
    if (cards.length !== 0) {
        const lastCard = cards.at(-1);
        if (!lastCard) 
            throw new Error("Error while computing card position");
        newCardPosition = lastCard.position / 2.0;
    }

    const [cardModalVisible, setCardModalVisible] = useState(false);

    return <div ref={cards.length === 0 ? ref : undefined} 
                className="flex flex-col gap-8 ml-4 shrink-0 grow-0 overflow-clip bg-linear-to-b from-gray-900 to-gray-800 p-4 rounded-xl w-74 max-w-76 min-h-0 max-h-full"
                data-testid={`li_${id}`}
            >
                    <header className="flex shrink-0 rounded-xl h-5">
                        <h2 className="ml-0.5 font-medium">{name}</h2>
                    </header>
                    <div className="text-lg flex flex-col gap-6 scrollbar-thumb-gray-700 shrink grow min-h-0 overflow-auto">
                        {
                            cards.length > 0 
                            ? cards.sort((c1, c2) => c2.position - c1.position).map((card, index) =>
                                    <Card 
                                        key={card.id} 
                                        title={card.title} 
                                        index={index} 
                                        listId={id} 
                                        id={card.id}
                                        handleDeleteCard={() => handleDeleteCard(card.id)}
                                        handleEditCard={(title: string) => handleEditCard(card.id, title)}
                                    />
                                )
                            : <p className="font-medium text-gray-700 self-center">
                                Nothing here yet
                            </p>
                        }
                    </div>
                    {
                        cardModalVisible === false
                        ? <button 
                            onClick={() => { setCardModalVisible(true) }}
                            className="font-extralight shrink-0 text-lg border-solid border rounded-xl w-fit p-1.5 mr-auto hover:border-cyan-400 active:border-cyan-400 active:scale-95 transition duration-200 cursor-pointer">
                            Add new card
                        </button>
                        : <ListModal 
                            addCard={(title: string, description?: string) => handleAddCard(newCardPosition, title, description)}
                            toggleModal={() => setCardModalVisible(false)}
                        />
                    }
            </div>
}