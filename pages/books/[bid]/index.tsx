import Link from "next/link";
import { HeadPage } from "../../components/books/HeadPage";

export async function getStaticProps({params}: any) {

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${params.bid}`);
  
  const data = await resp.json();

  return {
    props: {
      book: data
    }
  }  
}

export async function getStaticPaths() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`);
  
  const books = await resp.json();

  return {
    paths: books.map((book: any) => ({ params: { bid: String(book.id) } })
    ),
    fallback: false
  }
}

const BookDetail = ({book}: any) => {
  return (<>
      <HeadPage />
    <h1>{book.title}</h1>
    <Link href="/books">Book List</Link>
    </>
  )
}

export default BookDetail;