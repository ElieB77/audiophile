// Styles
import styles from "./styles.module.scss";
// Modules
import Link from "next/link";
import Image from "next/image";
// Components
import Button from "../../UI/Button";

interface ProductRecommendationProps {
  productImage?: string;
  productName?: string;
  productSlug?: string;
}

const ProductRecommendation = ({
  productImage,
  productName,
  productSlug,
}: ProductRecommendationProps) => {
  return (
    <div className={styles.__product_recommendation}>
      <div>
        <Image
          src={`/static${productImage!}`}
          alt="Product"
          fill
          objectFit="cover"
        />
      </div>
      <h5>{productName}</h5>
      <Link href={`${productSlug}`}>
        <Button btnContent="see product" />
      </Link>
    </div>
  );
};

export default ProductRecommendation;
