import React from 'react'
import { FaXmark } from "react-icons/fa6";

const FeatureFallBack = (props) => {
    console.log(props);
    function handleExit() {
        props.setIsForgotPasswordClicked(false);
    }

    return (
        <main className=' fixed inset-0 flex justify-center m-16'>
            <section className=' relative w-[450px] md:w-[600px] h-[150px] bg-slate-800 rounded-lg flex flex-col gap-2 items-center justify-center '>

                <button onClick={handleExit} className=' p-1 cursor-pointer'>
                    <FaXmark className=' absolute text-white size-6 hover:scale-[1.1] top-4 right-4' />
                </button>

                <h1 className=' text-white text-center text-lg font-semibold sm:text-xl '>We are going to enroll this feature soon</h1>
                <h1 className=' text-yellow-500 text-center text-lg font-semibold sm:text-xl'>Be patient</h1>

            </section>

        </main>
    )
}

export default FeatureFallBack
