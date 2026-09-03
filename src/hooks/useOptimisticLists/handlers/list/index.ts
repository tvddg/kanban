import handleCreateList from "./createList";
import handleDeleteList from "./deleteList";
import handleRenameList from "./renameList";

const listHandlers = {
    createList: handleCreateList,
    deleteList: handleDeleteList,
    renameList: handleRenameList
};

export default listHandlers;