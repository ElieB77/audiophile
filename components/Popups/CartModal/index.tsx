// Styles
import styles from "./styles.module.scss";
// Components
import Button from "../../UI/Button";
import CartItem from "../../Cart/CartItem";
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

  const goToCheckout = () => {
    router.push("/checkout");
    handleClick();
  };

  return (
    show && (
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
                <>
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
                </>
              </div>
              <div className={styles.__price}>
                <p>total</p>
                <h6>{"$" + cartTotalPrice.toLocaleString()}</h6>
                <Button btnContent="checkout" onClick={goToCheckout} />
              </div>
            </>
          ) : (
            <>
              <div className={styles.__empty_cart}>
                <p>Your cart is empty !</p>
                <p>
                  Before proceeding to checkout you must add some products to
                  the shopping cart. Check out our products !
                </p>
                <div className={styles.__links}>
                  <Link onClick={handleClick} href="/category/headphones">
                    Headphones
                  </Link>
                  <Link onClick={handleClick} href="/category/speakers">
                    Speakers
                  </Link>
                  <Link onClick={handleClick} href="/category/earphones">
                    Earphones
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    )
  );
};

export default CartModal;
