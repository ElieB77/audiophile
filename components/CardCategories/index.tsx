import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import { useRouter } from "next/router";

interface CardCategoriesProps {
  categoryName?: string;
  categoryImage?: string;
  categoryHref?: string;
  width: number;
  height: number;
}

const CardCategories = ({
  categoryName,
  categoryImage,
  categoryHref,
  width,
  height,
}: CardCategoriesProps) => {
  const router = useRouter();
  return (
    <>
      <div onClick={() => router.push(categoryHref!)}>
        <div className={styles.__card}>
          <Image
            className={styles.__photo}
            src={categoryImage!}
            alt=""
            width={width}
            height={height}
          />
          <div className={styles.__content}>
            <h6>{categoryName}</h6>
            <Button btnContent={"SHOP"} btnType="borderless" btnIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCategories;
