import React, { useEffect, useState, useContext } from 'react'
import EditBook from './Modals/EditBook';
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import clsx from 'clsx';
import { EditContext } from '../../context/React/EditContext';
import { DeleteContext } from '../../context/React/DeleteContext';


const BookCard = (props) => {

    const status = props.filteredBooks[props.filterIndex].status;
    const genre = props.filteredBooks[props.filterIndex].genre;
    const [coverURL, setCoverURL] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const { isEditOpen, setIsEditOpen, setEditIndex } = useContext(EditContext);
    const { setIsDeleteOpen, deleteIndex, setDeleteIndex, deletedCard } = useContext(DeleteContext);


    function handleCardEnter() {
        setIsClicked(true);
    }

    function handleCardLeave() {
        setIsClicked(false);
    }

    function handleEdit() {
        setEditIndex(props.index);
        setIsEditOpen(true);
    }

    function handleDelete() {
        setDeleteIndex(props.index);
        setIsDeleteOpen(true);
    }

    //using openBook api to get cover url of the book

    useEffect(() => {

        fetch(`https://covers.openlibrary.org/b/id/${props.filteredBooks[props.filterIndex].coverURL}-M.jpg`)
            .then((data) => setCoverURL(data.url))


    }, [props.filteredBooks])


    /* ClassName for status,genre & card */
    const statusClassName = ' text-white text-center inline-block w-fit px-1 py-1 sm:px-2 rounded-full text-sm sm:text-md font-semibold '
    const statusClsx = clsx(status === "reading" && "bg-green-600", status === "completed" && "bg-blue-500", status === "wishlist" && "bg-orange-400", statusClassName);

    const genreClass = ' text-white text-center inline-block w-fit px-1 py-1 sm:px-2 rounded-full text-sm sm:text-md font-semibold'
    const genreClsx = clsx(genreClass, genre === "F" && "bg-purple-500", genre === "NF" && "bg-yellow-500")

    const cardClassName = ' flex flex-col h-fit w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] gap-2 border-4 rounded-2xl hover:scale-105 z-0 transition duration-300'
    const cardClsx = clsx(cardClassName, status === "reading" && "border-green-500", status === "wishlist" && "border-orange-400", status === "completed" && "border-blue-400")



    return (
        <>
            {deletedCard !== props.index && <div onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave} className={cardClsx} >

                <img src={coverURL}
                    className=' w-full h-[210px] sm:h-[240px] md:h-[270px] lg:h-[300px] rounded-t-xl' />

                <div className=' flex justify-between items-center gap-2 px-0.5 mb-2 sm:px-2'>
                    <span className={statusClsx}>
                        {status}
                    </span>
                    <span className={genreClsx}>
                        {genre}
                    </span>

                </div>

                {isClicked && <div className=' flex justify-between items-center  border-t-1 border-gray-500 -mt-2'>
                    <button onClick={handleEdit} className='w-1/2 flex justify-center pb-2 border-r-1 border-r-gray-600 hover:bg-green-400 rounded-bl-xl'>
                        <MdEdit className=' text-white size-6' />

                    </button>
                    <button onClick={handleDelete} className=' w-1/2 flex justify-center hover:bg-red-400 pb-2 rounded-br-xl'>
                        <MdDeleteOutline className=' text-white size-6' />
                    </button>
                </div>}
            </div>
            }
        </>

    )
}

export default BookCard
