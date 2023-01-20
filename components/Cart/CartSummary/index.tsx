import styles from "./styles.module.scss";
import Image from "next/image";
import CartItem from "../CartItem";
import { useCart } from "../../../context/CartContext";
import Button from "../../UI/Button";

const CartSummary = () => {
  const { cartItems, cartTotalPrice } = useCart();
  console.log(cartItems);
  return (
    <div className={styles.__cart_summary}>
      <h6>summary</h6>
      <div className={styles.__cart_items}>
        {cartItems.map((item: any, index: number) => {
          return (
            <CartItem
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              id={item.id}
              removeTrashIcon
              removeQuantityCounter
            />
          );
        })}
      </div>
      <div className={styles.__footer}>
        <div className={styles.__total}>
          <p>total</p>
          <h6>{"$" + cartTotalPrice.toLocaleString()}</h6>
        </div>
        <Button btnContent="continue & pay" isFullWidth />
      </div>
    </div>
  );
};

export default CartSummary;
