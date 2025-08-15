import React, { useState } from 'react'
import clsx from 'clsx';

const Nav = (props) => {

    function handleFilterClick(btn) {

        props.setFilterButtons((prevState) =>
            prevState.map(filter => filter.status === btn.status ? { ...filter, isActive: !filter.isActive } : { ...filter })
        );

    }

    const filterBtnClassName = "text-md sm:text-lg  rounded-full px-2 py-1 sm:px-3 sm:py-2";

    return (
        <nav className=' mt-24'>
            <section className=' mx-auto flex justify-evenly sm:w-[720px] flex-wrap gap-4 '>
                {props.filterButtons.map((btn, index) => {

                    const className = clsx(filterBtnClassName, btn.isActive && "bg-blue-600 text-white", !btn.isActive && "text-slate-200 bg-slate-800  hover:bg-slate-700 hover:text-white");

                    return (
                        <button onClick={() => handleFilterClick(btn)} className={className} key={index}>{btn.status}</button>
                    )
                })
                }

            </section>
        </nav>
    )
}

export default Nav
