import { createContext, useState } from "react";
import { EditContext } from "./EditContext";

export const DeleteContext = createContext();

export const DeleteProvider = ({ children }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(0);
    const [DeletedCard, setDeletedCard] = useState(-1);

    return (
        <DeleteContext.Provider value={{ isDeleteOpen, setIsDeleteOpen, deleteIndex, setDeleteIndex, DeletedCard, setDeletedCard }}>
            {children}
        </DeleteContext.Provider>

    )

}
