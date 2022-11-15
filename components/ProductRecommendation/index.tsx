import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

interface Props {
  productImage?: string;
  productName?: string;
  productSlug?: string;
}

const ProductRecommendation = ({
  productImage,
  productName,
  productSlug,
}: Props) => {
  return (
    <div className={styles.__product_recommendation}>
      <div>
        <Image src={productImage!} alt="Product" fill objectFit="cover" />
      </div>
      <h5>{productName}</h5>
      {/* <Link href={productSlug}> */}
      <Button btnContent="see product" />
      {/* </Link> */}
    </div>
  );
};

export default ProductRecommendation;
