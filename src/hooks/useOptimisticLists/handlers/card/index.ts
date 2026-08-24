import handleAddCard from "./addCard";
import handleDeleteCard from "./deleteCard";
import handleEditCard from "./editCard";
import handleMoveCard from "./moveCard";

const cardHandlers = { 
    addCard: handleAddCard, 
    deleteCard: handleDeleteCard, 
    editCard: handleEditCard, 
    moveCard: handleMoveCard 
};

export default cardHandlers;