import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HeadPage } from "../../components/books/HeadPage";

export async function getServerSideProps({params}) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${params.bid}`);

  const data = await resp.json();

  return {
    props: {
      book: data
    }
  }
}

const BookEdit = ({book}) => {
    const router = useRouter();
    const [bookTitle, setBookTitle] = useState(book.title);
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${book.id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
              title: bookTitle,
              _method: 'PATCH'
            })
        });  
        
        if (!resp.ok) {
            const data = await resp.json();
            setErrors(data.errors);
            return;
        }

        setErrors([]);
        setBookTitle('');
        return router.push('/books')

    }

    return (
    <>
      <HeadPage />
            <h1>Book Edit</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setBookTitle(e.target.value)}
                    value={String(bookTitle)} disabled={submitting}
                />
                <button type="submit" disabled={submitting}>{submitting ? 'Enviando...' : 'Enviar'}</button>
                {errors.title ?
                    (<span style={{color: 'red', display: 'block'}}>{errors.title}</span>) : null}
            </form>
            <br />
            <Link href="/books">Book List</Link>
    </>
  )
}

export default BookEdit;