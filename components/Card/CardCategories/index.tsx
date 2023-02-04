// Styles
import styles from "./styles.module.scss";
// Components
import Button from "../../UI/Button";
// Modules
import { useRouter } from "next/router";
import Image from "next/image";

interface CardCategoriesProps {
  categoryName?: string;
  categoryImage?: string;
  categoryHref?: string;
  btnContent: string;
}

const CardCategories = ({
  categoryName,
  categoryImage,
  categoryHref,
  btnContent,
}: CardCategoriesProps) => {
  const router = useRouter();
  return (
    <>
      <div onClick={() => router.push(categoryHref!)}>
        <div className={styles.__card}>
          <Image
            className={styles.__photo}
            src={`${categoryImage!}`}
            alt="Category"
            width={200}
            height={200}
          />
          <div className={styles.__content}>
            <h6>{categoryName}</h6>
            <Button btnContent={btnContent} btnType="borderless" btnIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCategories;
