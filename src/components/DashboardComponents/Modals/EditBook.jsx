import React, { useState, useContext } from 'react'
import { FiX } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md'
import { EditContext } from '../../../context/React/EditContext';
import { useFirestoreBooks } from '../../../hooks/useFirestoreBook';


const EditBook = (props) => {

    const { isEditOpen, setIsEditOpen, editIndex } = useContext(EditContext);
    const [bookStatus, setBookStatus] = useState(props.booksInfo[editIndex].status);
    const { addDocument } = useFirestoreBooks();

    function handleX() {
        setIsEditOpen(false);
    }

    function handleEdit() {

        const newState = props.booksInfo.map((book) => editIndex === book.index ? { ...book, status: bookStatus } : { ...book });
        props.setBooksInfo(newState);
        addDocument(newState);
        setIsEditOpen(false);
    }

    return (
        <main className=' fixed inset-0 bg-gray-900/70 flex items-center justify-center z-20'>
            <section className=' relative h-[210px] w-[400px] sm:w-[450px] bg-gray-800 rounded-lg '>
                <div className=' flex gap-2 mt-2 justify-center'>

                    <MdEdit className=' text-white size-6 mt-1' />
                    <h2 className=' text-white text-2xl font-semibold inline-block'>edit</h2>

                </div>

                <button onClick={handleX} className=' p-0.5 cursor-pointer absolute right-2 top-2'>
                    <FiX className=' size-6  text-white hover:scale-115 ' />
                </button>


                <div className='mt-4 px-4'>
                    <h2 className=' text-white text-xl font-semibold inline-block '>Book Status</h2>
                    <form className=' mt-2 flex gap-6'
                    >
                        <label className=' flex items-center gap-2'>

                            <input type="radio" name='status' value='reading' checked={bookStatus === "reading"} onChange={(e) => setBookStatus(e.target.value)} className=' size-4 accent-green-400' />
                            <span className=' text-green-400 text-lg '>Reading</span>

                        </label>
                        <label className=' flex items-center gap-2'>

                            <input type="radio" name='status' value='completed' checked={bookStatus === "completed"} onChange={(e) => setBookStatus(e.target.value)} className=' size-4 accent-blue-400' />
                            <span className=' text-blue-400 text-lg '>Completed
                            </span>

                        </label>
                        <label className=' flex items-center gap-2'>

                            <input type="radio" name='status' value='wishlist' checked={bookStatus === "wishlist"} onChange={(e) => setBookStatus(e.target.value)} className=' size-4 accent-orange-400' />
                            <span className=' text-orange-400 text-lg '>Wishlist</span>

                        </label>

                    </form>

                </div>

                <div className='mt-8 text-center px-4 '>

                    <button onClick={handleEdit} className=' text-lg px-4 sm:px-6 py-2  bg-green-500 font-semibold text-white rounded-lg hover:bg-green-600 cursor-pointer '>Edit</button>

                </div>




            </section>

        </main>
    )
}

export default EditBook

