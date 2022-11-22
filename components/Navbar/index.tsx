import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import CartModal from "../CartModal";

interface Props {
  overrideClassname?: React.CSSProperties | string;
}

const Navbar = ({ overrideClassname }: Props) => {
  const router = useRouter();
  console.log("Navbar:", router.query);
  const navbarLinks = [
    { text: "home", href: "/" },
    { text: "headphones", href: "/category/headphones" },
    { text: "speakers", href: "/category/speakers" },
    { text: "earphones", href: "/category/earphones" },
  ];
  return (
    <div className={`${styles.__navbar} ${overrideClassname}`}>
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
