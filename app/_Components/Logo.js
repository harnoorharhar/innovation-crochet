import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="The logo of the innovation Crochet"
        width={80}
        height={80}
        priority
      />
    </Link>
  );
}

export default Logo;
