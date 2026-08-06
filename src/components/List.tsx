"use client";

import { ListId } from "@/types/brands";
import Card, { CardProps } from "./Card";
import { useDroppable } from "@dnd-kit/react";
import { useState } from "react";
import ListModal from "./ListModal";

export interface ListProps {
    id: ListId;
    name: string;
    cards: CardProps[];
    addCard: (name: string) => void;
}

export default function List({ id, name, cards, addCard }: ListProps) {
    const { ref } = useDroppable({
        id
    });

    const [cardModalVisible, setCardModalVisible] = useState(false);

    return <div ref={ref} 
                className="flex flex-col gap-8 ml-4 shrink-0 bg-linear-to-b from-gray-900 to-gray-800 p-4 rounded-xl w-64 h-fit min-w-fit max-h-1/12">
                    <header className="flex shrink-0 rounded-xl h-5">
                        <h2 className="ml-0.5 font-medium">{name}</h2>
                    </header>
                    <div className="text-xl shrink-0 flex flex-col gap-6 overflow-y-scroll scrollbar-thumb-gray-700">
                        {
                            cards.length > 0 
                            ? cards.map(card =>
                                    <Card key={card.id} name={card.name} listId={id} id={card.id} />
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
                            addCard={(name: string) => addCard(name)}
                            toggleModal={() => setCardModalVisible(false)}
                        />
                    }
            </div>
}