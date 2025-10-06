import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the RAG System</h1>
      <nav>
        <ul>
          <li><Link href="/about-us">About Us</Link></li>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          <li><Link href="/contact-us">Contact Us</Link></li>
        </ul>
      </nav>
      <Footer />
    </div>
  );
}
