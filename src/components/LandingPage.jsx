import React from 'react'
import book from "../assets/book-01.png"
import { useNavigate } from 'react-router';

const LandingPage = (props) => {

    const navigate = useNavigate();

    function handleSignup() {
        props.setIsSignup(true);
        navigate("/auth");
    }

    return (
        <main className='  min-h-screen mx-auto md:max-w-full lg:max-w-5xl xl:max-w-7xl '>
            <div className='  px-6 h-[100vh] flex justify-center items-center flex-col md:flex-row-reverse mx-auto gap-10 '>
                <div className='w-full md:w-1/2'>
                    <img src={book} className='size-70 sm:size-60 md:size-80 lg:size-100 mx-auto md:mt-12 ' alt="" />
                </div>
                <div className=' w-full md:w-1/2 mx-auto'>
                    <h2 className=' text-white mx-auto md:mt-36 font-bold text-4xl sm:text-6xl md:text-5xl lg:text-6xl md:leading-16 text-center'>Track <span className=' text-yellow-400'>Reading</span> Plan <span className=' text-green-500'>Books</span> Build Your <span className=' text-orange-500'>Cozy</span> <span className=' text-indigo-400'>Personal Library Nest.</span></h2>
                </div>

            </div>

            {/* About */}

            <hr className=' w-1/2 text-white mx-auto border-2' />

            <div className='mt-6 mx-auto px-6 mb-24'>
                <h1 className=' text-yellow-500 font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-center '>Our Goals</h1>
                <p className=' mt-6 md:mt-12 text-white text-2xl md:text-3xl text-center'>
                    BookNest is your personal reading tracker. Save books you want to read, organize them by status, filter your list, and stay motivated to complete every story at your own pace.
                </p>

                <ul className='mt-12 md:mt-18 lg:mt-24 ml-8 md:ml-16 text-white list-disc space-y-4 md:space-y-6 text-2xl '>
                    <li>Save books you dream of reading.</li>
                    <li>Organize your collection by status — Reading, Completed, or wishlist.
                    </li>
                    <li>Effortlessly search and filter your reading list.</li>
                    <li>Track your progress as you move through each story.</li>
                    <li>Stay inspired and motivated to read more at your own pace.</li>
                </ul>

                <h3 className=' text-green-500 font-semibold text-3xl md:text-4xl lg:text-5xl mt-8 md:mt-16 lg:mt-20 text-center'>Just sign up to get started!</h3>
                <button onClick={handleSignup} className=' mt-6 sm:mt-8 md:mt-10 px-6 py-2 sm:px-8 sm:py-3 text-xl md:text-2xl text-white bg-green-600 block mx-auto rounded-full font-semibold hover:bg-green-500/80 shadow-md shadow-green-300 cursor-pointer hover:shadow-sm hover:shadow-green-200 '>Sign Up</button>
            </div>

        </main>

    )
}

export default LandingPage
