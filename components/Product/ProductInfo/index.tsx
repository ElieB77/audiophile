// Styles
import styles from "./styles.module.scss";
// Modules
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// Components
import Counter from "../../UI/Counter";
import Button from "../../UI/Button";
import StarRatings from "../../Review/StarRatings";
// Context
import { useCart } from "../../../context/CartContext";

interface ProductInfoProps {
  image?: string;
  cartImage?: string;
  cartName?: string;
  isNew?: boolean;
  name?: string;
  description?: string;
  price: number;
  index?: number;
  showCounterQuantity?: boolean;
  id: number;
  quantity?: number;
  ratingCount?: number;
  count?: any;
  reviewLength?: any;
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
  count,
  reviewLength,
}: ProductInfoProps) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const reverseClass = index && index % 2 !== 0 ? styles.__reverse : null;
  const showNewArticle = isNew ? <p className="overline">new product</p> : null;
  const selectedButton = showCounterQuantity ? (
    <div className={styles.__add_to_cart}>
      <Counter />
      <Button
        onClick={() => addToCart(id, cartImage!, cartName!, price)}
        btnContent="add to cart"
      />
    </div>
  ) : (
    <div className={styles.__see_product_btn}>
      <Link href={`/product/${id}`}>
        <Button btnContent="see product" />
      </Link>
    </div>
  );

  return (
    <div className={styles.__product_info}>
      <div className={`${styles.__image} ${reverseClass}`}>
        <Image src={`/static${image!}`} alt="article" fill objectFit="cover" />
      </div>
      <div className={styles.__info}>
        {showNewArticle}
        <h2>{name}</h2>
        <div className={styles.__stars}>
          <div className={styles.__rating}>
            <p>{Math.floor(count)}</p>
            <div>
              <StarRatings count={count} />
            </div>
            <p>({reviewLength})</p>
          </div>
          {router.pathname === "/product/[id]" && (
            <div className={styles.__links}>
              <Link href="#customer-review" scroll={false}>
                <Button
                  btnContent={"show all reviews"}
                  btnType={"borderless"}
                />
              </Link>
              <p>/</p>
              <Button
                btnContent={"leave a review"}
                btnType="borderless"
                onClick={() =>
                  router.push(`/create-review/${id}`, undefined, {
                    shallow: true,
                  })
                }
              />
            </div>
          )}
        </div>
        <p>{description}</p>
        {showCounterQuantity && <h6>{"$" + price?.toLocaleString()}</h6>}
        {selectedButton}
      </div>
    </div>
  );
};

export default ProductInfo;
