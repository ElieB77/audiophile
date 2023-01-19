// Styles
import styles from "./styles.module.scss";
// Component
import CartModal from "../../Cart/CartModal";
import UserModal from "../../User/UserModal";
// Modules
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// Hooks
import { useCartModal } from "../../../hooks/useCartModal";
import { useUserModal } from "../../../hooks/useUserModal";
// Context
import { useCart } from "../../../context/CartContext";
// Assets
import CartIcon from "../../../assets/public/cart.svg";
import Logo from "../../../assets/public/logo-audiophile.svg";
import UserIcon from "../../../assets/public/user-icon.svg";
import { getToken, isLoggedIn, removeToken } from "../../../utilities/auth";
import { useEffect, useState } from "react";

interface NavbarProps {
  overrideClassname?: React.CSSProperties | string;
}

const Navbar = ({ overrideClassname }: NavbarProps) => {
  const [isShowingCartModal, toggleCartModal] = useCartModal();
  const [isShowingUserModal, toggleUserModal] = useUserModal();
  const { cartQuantity, cartItemsApi } = useCart();
  const [rerender, setRerender] = useState(false);
  const router = useRouter();

  const navbarLinks = [
    {
      text: "home",
      href: "/",
      active: router.pathname === "/" ? styles.__active : "",
    },
    {
      text: "headphones",
      href: "/category/headphones",
      active: router.query.category === "headphones" ? styles.__active : "",
    },
    {
      text: "speakers",
      href: "/category/speakers",
      active: router.query.category === "speakers" ? styles.__active : "",
    },
    {
      text: "earphones",
      href: "/category/earphones",
      active: router.query.category === "earphones" ? styles.__active : "",
    },
  ];

  useEffect(() => {
    setRerender(!rerender);
  }, [isLoggedIn, removeToken, getToken]);

  return (
    <>
      <CartModal show={isShowingCartModal} handleClick={toggleCartModal} />
      <UserModal show={isShowingUserModal} handleClick={toggleUserModal} />
      <div className={`${styles.__navbar} ${overrideClassname}`}>
        <Link href="/">
          <Image src={Logo} alt="Logo" width={143} height={25} />
        </Link>
        <div className={styles.__links}>
          {navbarLinks.map((link: any, index: number) => {
            return (
              <Link href={link.href} key={index} className={link.active}>
                {link.text}
              </Link>
            );
          })}
        </div>
        <div className={styles.__icons}>
          <div onClick={toggleCartModal} className={styles.__cart}>
            <Image src={CartIcon} alt="Cart" width={23} height={20} />
            {!isLoggedIn() && cartQuantity > 0 && (
              <div className={styles.__cart_qty}>{cartQuantity}</div>
            )}
            {isLoggedIn() && cartItemsApi.quantity > 0 && (
              <div className={styles.__cart_qty}>{cartItemsApi.quantity}</div>
            )}
          </div>
          <div className={styles.__user} onClick={toggleUserModal}>
            <Image src={UserIcon} alt="User" width={23} height={20} />
          </div>
        </div>
        <div className={styles.__divider}></div>
      </div>
    </>
  );
};

export default Navbar;
