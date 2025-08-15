import React, { useState } from 'react'
import BookCard from './BookCard'


const BooksContainer = (props) => {

    const booksArray = props.filteredBooks.map((book, index) => (
        <BookCard key={index} filteredBooks={props.filteredBooks} setBooksInfo={props.setBooksInfo} filterIndex={index} index={book.index} />
    ))


    return (
        <main className=' mt-8 px-4 mx-auto text-center mb-24'>
            <section className=' flex flex-wrap gap-x-4 gap-y-6 sm:gap-8 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 py-4'>
                {booksArray}
            </section>

        </main>
    )
}

export default BooksContainer

