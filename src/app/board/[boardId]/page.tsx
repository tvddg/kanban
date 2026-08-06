"use client";

// watch TODOS and fix the problem with card stretching

import { CardProps } from "@/components/Card";
import ListWrapper from "@/components/ListWrapper";
import { CardId, ListId } from "@/types/brands";
import { useState } from "react";

// TODO fix types (add models and db)
const Lists = [
    {
        id: 'li1' as ListId,
        name: "To do",
        cards: [
            { id: "it1", listId: "li1", name: "Do a clean up" }
        ] as CardProps[]
    },
    {
        id: 'li2' as ListId,
        name: "In progress",
        cards: [
            { id: "it2", listId: "li2", name: "Study frontend" }
        ] as CardProps[]
    },
    {
        id: 'li3' as ListId,
        name: "Done",
        cards: [
            { id: "it3", listId: "li3", name: "Get mad" }
        ] as CardProps[]
    }
];

export default function Board() {
    const [lists, setLists] = useState(Lists);

    const addCard = (name: string, listId: ListId) => {
        const card: CardProps = {
            name,
            listId,
            id: String(Date.now()) as CardId
        };

        const mutatingList = lists.find(list => list.id === listId)!;

        const listsOrder = lists.map(list => list.id);

        setLists(
            listsOrder.map(listId => {
                if (listId === mutatingList.id) {
                    return {
                        ...mutatingList,
                        cards: [
                            ...mutatingList.cards,
                            card
                        ]
                    }
                }

                return lists.find(list => list.id === listId)!;
            })
        );
    };

    const dragCard = (cardId: CardId, listToId: ListId, listFromId: ListId) => {
        // if card has been lifted and left in the same list
        if (listFromId === listToId) {
            // TODO ordering
            return;
        }
        
        const listsOrder = lists.map(list => list.id);
        const listFrom = lists.find(list => list.id === listFromId);
        const listTo = lists.find(list => list.id === listToId);
        const card = listFrom?.cards.find(card => card.id === cardId);
        if (listFrom === undefined || card === undefined || listTo === undefined) {
            // TODO handle error 
            return;
        }
        setLists(
            listsOrder.map(listId => {
                // if card has been dragged to another list
                if (listId === listFromId) {
                    return {
                        ...listFrom,
                        cards: listFrom.cards?.filter(item => item.id !== card.id) || []
                        // remove it from it's list
                    }
                }
                else if (listId === listToId) {
                    return {
                        ...listTo,
                        cards: [
                            ...listTo.cards,
                            card // and append that card to another list
                            // TODO ordering
                        ]
                    }
                }

                // if listId doesn't correspond to source
                // or target list, then just return that list 
                return lists.find(list => list.id === listId)!;
            })
        );
    };

    // TODO fix types
    return <ListWrapper lists={lists} addCard={addCard} dragCard={dragCard} />
}