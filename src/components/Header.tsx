import Image from "next/image";
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href='/'><Image src="/img/logo.svg" alt="Logo" width={320} height={73}/></Link>
    </header>
  );
}