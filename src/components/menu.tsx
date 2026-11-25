import Link from 'next/link';

export default function Menu() {
  return (
    <nav className='nav-menu'>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}