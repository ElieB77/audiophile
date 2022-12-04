// Styles
import styles from "./styles.module.scss";
// Modules
import Image from "next/image";
// Components
import Counter from "../../UI/Counter";
// Utilities
import { replaceString } from "../../../utilities/replaceString";
// Context
import { useCart } from "../../../context/CartContext";
// Assets
import TrashIcon from "../../../assets/public/trash-icon.svg";

interface CartItemProps {
  image: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}

const CartItem = ({ image, name, price, quantity, id }: CartItemProps) => {
  let cartImage = replaceString(image, "public", "");
  const { removeItem } = useCart();

  return (
    <div className={styles.__cart_item}>
      <div className={styles.__image}>
        <Image src={cartImage} alt="article" fill objectFit="cover" />
      </div>
      <div className={styles.__details}>
        <p>{name}</p>
        <p>{price.toLocaleString()}</p>
      </div>
      <Counter isCart value={quantity} />
      <div className={styles.__trash} onClick={() => removeItem(id)}>
        <Image src={TrashIcon} alt="article" fill objectFit="cover" />
      </div>
    </div>
  );
};

export default CartItem;
