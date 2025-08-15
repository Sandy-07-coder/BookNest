import React, { useEffect } from 'react'
import book from "../assets/book-03.png"
import { useNavigate } from 'react-router';


const Header = (props) => {
    const navigate = useNavigate();
    function handleLogin() {
        props.setIsLogin(true);
    }

    function handleSignup() {
        props.setIsSignup(true);
    }

    const auth = props.isLogin || props.isSignup;

    useEffect(() => {
        if (auth) {
            navigate("/auth");
        }

    }, [auth])

    return (
        <header className=' fixed top-0 left-0 dark:bg-teal-700 w-full h-16'>
            <div className=' px-4 sm:max-w-xl md:max-w-3xl lg:max-w-5xl m-auto flex h-full justify-between items-center '>

                {/* Heading */}
                <div className=' flex justify-between items-center gap-2 sm:gap-4 '>
                    <img src={book} className='size-8 sm:size-10' alt="logo" />
                    <h1 className=' text-2xl sm:text-3xl font-semibold text-white '>BookNest</h1>
                </div>

                {/* Login and signup */}
                <div className='flex justify-between items-center gap-4'>
                    <button onClick={handleLogin} className='px-2 py-1.5 sm:px-6 sm:py-2 font-semibold  bg-blue-500 rounded-lg text-white text-lg shadow-blue-400 cursor-pointer hover:bg-blue-700'>Log In</button>
                    <button onClick={handleSignup} className='px-2 py-1.5 sm:px-6 sm:py-2 font-semibold bg-green-500 rounded-lg text-white text-lg shadow-green-500 cursor-pointer hover:bg-green-400'>Sign Up</button>
                </div>
            </div>

        </header>
    )
}

export default Header
