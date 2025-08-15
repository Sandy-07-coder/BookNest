import React from 'react'
import book from "../../assets/book-03.png"
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router';
import UserInfoCard from './UserInfoCard';
import * as Popover from '@radix-ui/react-popover';


const Header = (props) => {

    const navigate = useNavigate();

    function handleAddBookClick() {
        props.setIsCreateOpen(true);
    }

    function handleLogout() {
        doSignOut().then(() => {
            navigate("/")
        })
            .catch((err) => {
                console.error(err)
            })
        navigate("/")
    }

    return (
        <header className=' fixed top-0 left-0 z-10 dark:bg-teal-700 w-full h-16'>
            <div className=' px-4 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl m-auto flex h-full justify-between items-center '>

                {/* Heading */}
                <div className=' flex justify-between items-center gap-2 sm:gap-4 '>
                    <img src={book} className='size-8 sm:size-10' alt="logo" />
                    <h1 className=' text-2xl sm:text-3xl font-semibold text-white '>BookNest</h1>
                </div>


                {/* add icon, User info and Log out  */}
                <div className='flex justify-around items-center gap-4 sm:gap-6'>

                    <button onClick={handleAddBookClick} className=' size-8 bg-yellow-500 rounded-full sm:-ml-5 group hover:bg-amber-300 cursor-pointer'>
                        <FaPlus className=' text-gray-900  mx-auto size-4 group-hover:text-black' />
                    </button>


                    <Popover.Root>
                        <Popover.Trigger asChild>

                            <button className=' p-0.5 font-semibold rounded-lg text-white text-lg  cursor-pointer'>
                                <FaUserCircle className='size-7 text-gray-200 hover:text-gray-400 ' />
                            </button>

                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content sideOffset={10}
                                align="center">

                                <UserInfoCard totalBooks={props.totalBooks} />
                                <Popover.Arrow height={5} width={10} className=' fill-gray-800' />
                            </Popover.Content>

                        </Popover.Portal>
                    </Popover.Root>


                    <button onClick={handleLogout} className='px-2 py-1.5 sm:px-3 sm:py-2 font-semibold bg-orange-600 rounded-lg text-white text-lg shadow-green-500 cursor-pointer hover:bg-red-500'>Log out</button>
                </div>
            </div>

        </header>
    )
}

export default Header
