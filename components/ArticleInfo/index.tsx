import styles from "./styles.module.scss";
import Button from "../Button";
import Image from "next/image";
import Counter from "../Counter";

interface Props {
  image?: string;
  isNew?: boolean;
  name?: string;
  description?: string;
  price?: number;
  index?: number;
  showCounterQuantity?: boolean;
}

const ArticleInfo = ({
  image,
  isNew,
  name,
  description,
  price,
  index,
  showCounterQuantity,
}: Props) => {
  const reverseClass = index && index % 2 !== 0 ? styles.__reverse : null;
  const showNewArticle = isNew ? <p className="overline">new product</p> : null;
  const selectedButton = showCounterQuantity ? (
    <div className={styles.__add_to_cart}>
      <Counter />
      <Button btnContent="add to cart" />
    </div>
  ) : (
    <Button btnContent="see product" />
  );
  return (
    <div className={styles.__article_info}>
      <div className={`${styles.__image} ${reverseClass}`}>
        <Image src={image!} alt="article" fill objectFit="cover" />
      </div>
      <div className={styles.__info}>
        {showNewArticle}
        <h2>{name}</h2>
        <p>{description}</p>
        <h6>{price}</h6>
        {selectedButton}
      </div>
    </div>
  );
};

export default ArticleInfo;
