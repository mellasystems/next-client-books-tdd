import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { HeadPage } from './components/books/HeadPage'

export default function Home() {
  return (
    <div className={styles.container}>
      <HeadPage />

      <h1>Books App</h1>

      <Link href="/books">Book List</Link>
    </div>
  )
}
