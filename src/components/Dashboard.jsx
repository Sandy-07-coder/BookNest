import React, { useState, useContext, useEffect } from 'react'
import Header from "./DashboardComponents/Header.jsx"
import Nav from './DashboardComponents/Nav.jsx';
import BooksContainer from './DashboardComponents/BooksContainer.jsx';
import CreateBook from './DashboardComponents/Modals/CreateBook.jsx';
import { EditContext } from '../context/React/EditContext.jsx';
import EditBook from './DashboardComponents/Modals/EditBook.jsx';
import { DeleteContext } from '../context/React/DeleteContext.jsx';
import DeleteBook from './DashboardComponents/Modals/DeleteBook.jsx';
import { useFirestoreBooks } from '../hooks/useFirestoreBook.jsx';



const Dashboard = () => {
    const [isUserIconClicked, setIsUserIconClicked] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const { isEditOpen, setIsEditOpen } = useContext(EditContext);
    const { isDeleteOpen } = useContext(DeleteContext);
    const [booksInfo, setBooksInfo] = useState([]);
    const { addDocument, getDocument } = useFirestoreBooks();


    const [filterButtons, setFilterButtons] = useState(
        [
            { status: "all books", isActive: true },
            { status: "reading", isActive: false },
            { status: "completed", isActive: false },
            { status: "wishlist", isActive: false },
        ]
    )

    const activeBtns = filterButtons.filter(btn => btn.isActive === true);
    const selectedStatuses = activeBtns.map(item => item.status);

    let filteredBooks;

    if (selectedStatuses.includes("all books")) {
        filteredBooks = booksInfo;
    }
    else {
        filteredBooks = booksInfo.filter(book => selectedStatuses.includes(book.status));
    }

    useEffect(() => {

        getDocument().then((books) => {
            setBooksInfo(books);
        });

    }, []);


    return (
        <>
            <Header isUserIconClicked={isUserIconClicked} setIsUserIconClicked={setIsUserIconClicked} setIsCreateOpen={setIsCreateOpen} totalBooks={booksInfo.length} />
            <Nav filterButtons={filterButtons} setFilterButtons={setFilterButtons} booksInfo={booksInfo} />
            <BooksContainer filteredBooks={filteredBooks} setBooksInfo={setBooksInfo} />
            {isCreateOpen && <CreateBook booksInfo={booksInfo} setIsCreateOpen={setIsCreateOpen} setBooksInfo={setBooksInfo} />}
            {isEditOpen && <EditBook booksInfo={booksInfo} setBooksInfo={setBooksInfo} />}
            {isDeleteOpen && <DeleteBook booksInfo={booksInfo} setBooksInfo={setBooksInfo} />}

        </>
    )
}


export default Dashboard;
