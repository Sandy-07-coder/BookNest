import React, { useContext } from 'react'
import { DeleteContext } from '../../../context/React/DeleteContext'
import { useFirestoreBooks } from '../../../hooks/useFirestoreBook';


const DeleteBook = (props) => {
    const { setIsDeleteOpen, deleteIndex, setDeletedCard } = useContext(DeleteContext);
    const { addDocument } = useFirestoreBooks();

    function handleCancel() {
        setIsDeleteOpen(false);
    }

    function handleDelete() {
        setDeletedCard(deleteIndex);
        const newState = props.booksInfo.filter(book => book.index !== deleteIndex).map((book, index) => ({ ...book, index }));
        props.setBooksInfo(newState);
        addDocument(newState)
        setIsDeleteOpen(false);

    }

    return (
        <main className=' fixed inset-0 bg-gray-900/70 z-30 flex justify-center items-center'>
            <section className=' relative h-[140px] sm:h-[120px] w-[350px] sm:w-[500px] bg-gray-800 rounded-lg'>
                <h3 className=' text-xl sm:text-2xl text-white font-semibold text-center mt-4 text-wrap'>Do you really want to delete this book?</h3>
                <div className=' flex gap-6 mt-4 justify-center'>
                    <button onClick={handleCancel} className=' text-white bg-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 cursor-pointer'>Cancel</button>
                    <button onClick={handleDelete} className=' text-white bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 cursor-pointer'>Delete</button>
                </div>

            </section>
        </main>
    )
}

export default DeleteBook 
