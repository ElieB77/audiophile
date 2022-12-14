// Styles
import styles from "./styles.module.scss";
// Components
import Button from "../../UI/Button";
import Counter from "../../UI/Counter";
import CartItem from "../CartItem";
// Context
import { useCart } from "../../../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";

interface CartModalProps {
  show: any;
  handleClick?: any;
}

const CartModal = ({ show, handleClick }: CartModalProps) => {
  const { cartItems, cartQuantity, clearCart, cartTotalPrice } = useCart();
  const router = useRouter();

  return show ? (
    <>
      <div className={styles.__overlay} onClick={handleClick}></div>
      <div className={styles.__modal}>
        {cartQuantity !== 0 ? (
          <>
            <div className={styles.__head}>
              <h6>
                CART <span>({cartQuantity})</span>
              </h6>
              <p onClick={() => clearCart()}>Remove All</p>
            </div>
            <div className={styles.__body}>
              {cartItems.map((item: any, index: number) => {
                return (
                  <CartItem
                    key={index}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    id={item.id}
                  />
                );
              })}
            </div>
            <div className={styles.__price}>
              <p>total</p>
              <h6>{"$" + cartTotalPrice.toLocaleString()}</h6>
              <Button
                btnContent="checkout"
                onClick={() => router.push("/checkout")}
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.__empty_cart}>
              <p>Your cart is empty !</p>
              <p>
                Before proceeding to checkout you must add some products to the
                shopping cart. Check out our products !
              </p>
              <div className={styles.__links}>
                <Link href="/category/headphones">Headphones</Link>
                <Link href="/category/speakers">Speakers</Link>
                <Link href="/category/earphones">Earphones</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  ) : null;
};

export default CartModal;
