import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HeadPage } from "../components/books/HeadPage";

const BookCreate = () => {
    const router = useRouter();
    const [bookTitle, setBookTitle] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title: bookTitle
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
            <h1>Book Create</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setBookTitle(e.target.value)}
                    value={bookTitle} disabled={submitting}
                />
                <button type="submit">{submitting ? 'Enviando...' : 'Enviar'}</button>
                {errors.title ?
                    (<span style={{color: 'red', display: 'block'}}>{errors.title}</span>) : null}
            </form>
            <br />
            <Link href="/books">Book List</Link>
    </>
  )
}

export default BookCreate;