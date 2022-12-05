// Styles
import styles from "./styles.module.scss";
// Components
import Button from "../../UI/Button";
import Counter from "../../UI/Counter";
import CartItem from "../CartItem";
// Modules
import Image from "next/image";
// Context
import { useCart } from "../../../context/CartContext";

interface CartModalProps {
  show: any;
  handleClick?: any;
}

const CartModal = ({ show, handleClick }: CartModalProps) => {
  const { cartItems, cartQuantity, clearCart, cartTotalPrice } = useCart();

  console.log("cartModal", cartItems);

  return show ? (
    <>
      <div className={styles.__overlay} onClick={handleClick}></div>
      <div className={styles.__modal}>
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
          <Button btnContent="checkout" />
        </div>
      </div>
    </>
  ) : null;
};

export default CartModal;
