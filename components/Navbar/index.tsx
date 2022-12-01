import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import Modal from "../Modal";
import { useModal } from "../../utilities";

interface NavbarProps {
  overrideClassname?: React.CSSProperties | string;
}

const Navbar = ({ overrideClassname }: NavbarProps) => {
  const [isShowingModal, toggleModal] = useModal();

  const navbarLinks = [
    { text: "home", href: "/" },
    { text: "headphones", href: "/category/headphones" },
    { text: "speakers", href: "/category/speakers" },
    { text: "earphones", href: "/category/earphones" },
  ];
  return (
    <>
      <Modal itemsLength={5} show={isShowingModal} handleClick={toggleModal} />
      <div className={`${styles.__navbar} ${overrideClassname}`}>
        <Link href="/">
          <Image
            src="/logo-audiophile.svg"
            alt="Logo"
            width={143}
            height={25}
          />
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
        <Image
          onClick={toggleModal}
          src="/cart.svg"
          alt="Cart"
          width={23}
          height={20}
        />
        <div className={styles.__divider}></div>
      </div>
    </>
  );
};

export default Navbar;
