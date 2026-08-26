import handleAddCard from "./addCard";
import handleDeleteCard from "./deleteCard";
import handleEditCard from "./editCard";
import handlePreviewMoveCard from "./previewMoveCard";
import handleCommitCardPosition from "./commitCardPosition";

const cardHandlers = {
    addCard: handleAddCard,
    deleteCard: handleDeleteCard,
    editCard: handleEditCard,
    previewMoveCard: handlePreviewMoveCard,
    commitCardPosition: handleCommitCardPosition
};

export default cardHandlers;
