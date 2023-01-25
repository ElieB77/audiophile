// Styles
import styles from "./styles.module.scss";
// Modules
import Link from "next/link";
import Image from "next/image";
// Components
import Counter from "../../UI/Counter";
import Button from "../../UI/Button";
// Context
import { useCart } from "../../../context/CartContext";
// Utilities
import { isLoggedIn } from "../../../utilities/auth";
import { postData } from "../../../utilities/api";

interface ProductInfoProps {
  image?: string;
  cartImage: string;
  cartName: string;
  isNew?: boolean;
  name?: string;
  description?: string;
  price: number;
  index?: number;
  showCounterQuantity?: boolean;
  id: number;
  quantity?: number;
}

const ProductInfo = ({
  image,
  isNew,
  name,
  description,
  price,
  index,
  showCounterQuantity,
  id,
  cartImage,
  cartName,
}: ProductInfoProps) => {
  const { addToCart } = useCart();

  const reverseClass = index && index % 2 !== 0 ? styles.__reverse : null;
  const showNewArticle = isNew ? <p className="overline">new product</p> : null;
  const selectedButton = showCounterQuantity ? (
    <div className={styles.__add_to_cart}>
      <Counter />
      <Button
        onClick={() => addToCart(id, cartImage, cartName, price)}
        btnContent="add to cart"
      />
    </div>
  ) : (
    <Link href={`/product/${id}`}>
      <Button btnContent="see product" />
    </Link>
  );

  return (
    <div className={styles.__product_info}>
      <div className={`${styles.__image} ${reverseClass}`}>
        <Image src={`/static${image!}`} alt="article" fill objectFit="cover" />
      </div>
      <div className={styles.__info}>
        {showNewArticle}
        <h2>{name}</h2>
        <p>{description}</p>
        {showCounterQuantity && <h6>{"$" + price?.toLocaleString()}</h6>}
        {selectedButton}
      </div>
    </div>
  );
};

export default ProductInfo;
