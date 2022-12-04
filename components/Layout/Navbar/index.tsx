import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import CartModal from "../../Cart/CartModal";
import { useCartModal } from "../../../hooks/useCartModal";
import { useCart } from "../../../context/CartContext";
import CartIcon from "../../../assets/public/cart.svg";
import Logo from "../../../assets/public/logo-audiophile.svg";

interface NavbarProps {
  overrideClassname?: React.CSSProperties | string;
}

const Navbar = ({ overrideClassname }: NavbarProps) => {
  const [isShowingCartModal, toggleCartModal] = useCartModal();
  const { cartQuantity } = useCart();

  const navbarLinks = [
    { text: "home", href: "/" },
    { text: "headphones", href: "/category/headphones" },
    { text: "speakers", href: "/category/speakers" },
    { text: "earphones", href: "/category/earphones" },
  ];
  return (
    <>
      <CartModal show={isShowingCartModal} handleClick={toggleCartModal} />
      <div className={`${styles.__navbar} ${overrideClassname}`}>
        <Link href="/">
          <Image src={Logo} alt="Logo" width={143} height={25} />
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
        <div onClick={toggleCartModal} className={styles.__cart}>
          <Image src={CartIcon} alt="Cart" width={23} height={20} />
          {cartQuantity > 0 && (
            <div className={styles.__cart_qty}>{cartQuantity}</div>
          )}
        </div>
        <div className={styles.__divider}></div>
      </div>
    </>
  );
};

export default Navbar;
