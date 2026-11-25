import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Image src="/img/logo.svg" alt="Logo" width={320} height={73}/>
    </header>
  );
}