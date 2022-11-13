import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

const navbarLinks = [
  { text: "home", href: "/" },
  { text: "headphones", href: "/headphones" },
  { text: "speakers", href: "/speakers" },
  { text: "earphones", href: "/earphones" },
];

const Navbar = () => {
  return (
    <div className={styles.__navbar}>
      <Link href="/">
        <Image src="/logo-audiophile.svg" alt="Logo" width={143} height={25} />
      </Link>
      <div className={styles.__links}>
        {navbarLinks.map((link: any, index: number) => {
          return (
            <Link href={link.href} key={index}>
              {link.text}
            </Link>
          );
        })}
      </div>
      <Image src="/cart.svg" alt="Cart" width={23} height={20} />
      <div className={styles.__divider}></div>
    </div>
  );
};

export default Navbar;
