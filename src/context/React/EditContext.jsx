import { createContext, useState } from "react";

export const EditContext = createContext();

export const EditProvider = ({ children }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    return (
        <EditContext.Provider value={{ isEditOpen, setIsEditOpen, editIndex, setEditIndex }}>
            {children}
        </EditContext.Provider>
    )
}