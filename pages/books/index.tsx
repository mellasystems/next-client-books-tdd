import Link from 'next/link';
import React from 'react'
import { HeadPage } from '../components/books/HeadPage';

export async function getStaticProps() {

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`);
  
  const data = await resp.json();

  return {
    props: {
      books: data
    }
  }  
}

const BookList = ({ books }: any) => {
  
  const handleDelete = async (e, bookId) => { 
    e.preventDefault();
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${bookId}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
              _method: 'DELETE'
            })
        });
    if (resp.ok) window.location.href = '/books';
  }

  return (
    <>
      <HeadPage />
      {/* <pre>{ JSON.stringify(books)}</pre> */}
      <h1>Book List</h1>

      <ul>
        {books.map(book => (
          <li key={`book-${book.id}`}>
            <Link href={`/books/${book.id}`}>{book.title}</Link>
            {' - '}
            <Link href={`/books/${book.id}/edit`}>Edit</Link>
            {' - '}
            <form onSubmit={(e) => handleDelete(e, book.id)} style={{display: 'inline'}}>
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>

      <Link href="/books/create">Create Book</Link>
    </>
  )
}

export default BookList;