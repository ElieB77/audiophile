import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

interface Props {
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
}: Props) => {
  return (
    <>
      <Link href={categoryHref!}>
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
      </Link>
    </>
  );
};

export default CardCategories;
