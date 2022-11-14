import styles from "./styles.module.scss";
import Button from "../Button";
import Image from "next/image";

interface Props {
  image?: string;
  isNew?: boolean;
  name?: string;
  description?: string;
  index?: number;
}

const ArticleInfo = ({ image, isNew, name, description, index }: Props) => {
  const reverseClass = index && index % 2 !== 0 ? styles.__reverse : null;
  const showNewArticle = isNew ? <p className="overline">new product</p> : null;

  return (
    <div className={styles.__article_info}>
      <div className={`${styles.__image} ${reverseClass}`}>
        <Image src={image!} alt="article" fill objectFit="cover" />
      </div>
      <div className={styles.__info}>
        {showNewArticle}
        <h2>{name}</h2>
        <p>{description}</p>
        <Button btnContent="see product" />
      </div>
    </div>
  );
};

export default ArticleInfo;
