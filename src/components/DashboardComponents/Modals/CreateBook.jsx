import React, { useEffect, useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import { RadioGroup } from "radix-ui";
import { GiLogging } from 'react-icons/gi';
import { useFirestoreBooks } from '../../../hooks/useFirestoreBook';



const CreateBook = (props) => {
    const [bookTitle, setBookTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [bookStatus, setBookStatus] = useState("");
    const [bookGenre, setBookGenre] = useState("ND");

    const [tittleError, setTittleError] = useState("");

    const { addDocument } = useFirestoreBooks();


    function handleX() {
        props.setIsCreateOpen(false);
    }
    function handleAdd() {
        if (bookTitle.trim() === "") {
            setTittleError("Required");
            return;
        }

        const encodedTitle = encodeURIComponent(bookTitle);
        // Book api to get author and cover image
        fetch(`https://openlibrary.org/search.json?q=${encodedTitle}`)
            .then((res) => res.json())
            .then((data) => {
                const newState = [...props.booksInfo, { title: bookTitle, genre: bookGenre, status: bookStatus, coverURL: data.docs[0].cover_i, index: props.booksInfo.length }];
                props.setBooksInfo(newState);
                addDocument(newState);
            })
            .catch((error) => {
                console.log("error in openlibrary api" + error.message)
            })

        props.setIsCreateOpen(false);

    }

    return (
        <section className=' fixed inset-0 flex items-center justify-center bg-gray-900/70'>
            <div className='relative px-4 bg-gray-800 h-[400px] w-auto mx-10 sm:mx-0 sm:w-[600px] flex flex-col rounded-xl'>
                <button onClick={handleX} className=' cursor-pointer p-0.5'>
                    <FaXmark className=' absolute right-5 top-5 text-gray-300 size-7 hover:text-white hover:scale-115' />
                </button>

                <h2 className=' text-white font-medium text-2xl sm:text-3xl text-center mt-4'>Add a New Book</h2>

                {/* Book Title */}

                <div className=' mt-8 '>
                    <span className=' inline-block text-lg sm:text-xl text-white font-semibold mb-2'>Book Title</span>
                    <span className=' inline-block text-red-500 text-xl ml-2'>*</span>
                    <span className='  text-red-500 text-md sm:text-lg ml-4 '>{tittleError}</span>
                    <input onChange={(e) => { setBookTitle(e.target.value), setTittleError("") }} type="text" className=' border border-gray-600 w-full h-9 rounded-lg bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white px-2' />
                </div>

                {/* Genre */}

                <div className=' mt-6 '>
                    <h3 className=' text-gray-100 text-xl font-semibold'>Book Genre</h3>
                    <form className='mt-2 flex gap-6'>
                        <label className=' flex items-center space-x-2'>
                            <input type="radio" name='genre' value='F' checked={bookGenre === "F"} onChange={(e) => setBookGenre(e.target.value)} className=' accent-purple-500 size-4' />
                            <span className=' text-purple-500 text-lg'>Fiction</span>
                        </label>

                        <label className=' flex items-center space-x-2'>
                            <input type="radio" name='genre' value='NF' checked={bookGenre === "NF"} onChange={(e) => setBookGenre(e.target.value)} className=' accent-yellow-500 size-4' />
                            <span className=' text-yellow-500 text-lg'>Non fiction</span>
                        </label>
                    </form>

                </div>

                {/* Book Status */}

                <div className='mt-6'>

                    <h3 className=' text-gray-100 text-xl font-semibold'>Status</h3>
                    <form className="mt-2 gap-6 flex ">

                        <label className="flex items-center space-x-2">
                            <input type="radio" name="status" value="reading" checked={bookStatus === "reading"} onChange={(e) => setBookStatus(e.target.value)} className="accent-green-500 size-4" />
                            <span className=' text-green-500 text-lg'>Reading</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input type="radio" name="status" value="completed" checked={bookStatus === "completed"} onChange={(e) => setBookStatus(e.target.value)} className="text-blue-600 size-4" />
                            <span className=' text-blue-500 text-lg '>Completed</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input type="radio" name="status" value="wishlist" checked={bookStatus === "wishlist"} onChange={(e) => setBookStatus(e.target.value)} className="accent-orange-600 size-4" />
                            <span className=' text-orange-500 text-lg'>Wishlist</span>
                        </label>
                    </form>
                </div>

                {/* Add button */}

                <div className=' text-end mb-2'>
                    <button onClick={handleAdd} className=' mt-4 w-fit text-xl font-semibold text-gray-200 rounded-lg bg-blue-400 px-4 py-2 hover:bg-blue-500 cursor-pointer'>ADD</button>
                </div>

            </div>

        </section>

    )
}

export default CreateBook
