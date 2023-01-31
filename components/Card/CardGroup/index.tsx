// Styles
import styles from "./styles.module.scss";
// Components
import Button from "../../UI/Button";
// Modules
import Link from "next/link";
import Image from "next/image";
// Assets
import PatternCircles from "../../../public/static/home/desktop/pattern-circles.svg";
import zx7Image from "../../../public/static/home/desktop/image-speaker-zx7.jpg";
import zx9Image from "../../../public/static/home/desktop/image-speaker-zx9.png";
import yx1Image from "../../../public/static/home/desktop/image-earphones-yx1.jpg";

interface CardGroupProps {
  firstBlockTitle?: string;
  firstBlockParagraph?: string;
  firstBlockProductId?: string;
  secondBlockTitle?: string;
  secondBlockProductId?: string;
  thirdBlockTitle?: string;
  thirdBlockProductId?: string;
  posters?: string[];
}

const CardGroup = ({
  firstBlockTitle,
  firstBlockParagraph,
  firstBlockProductId,
  secondBlockTitle,
  secondBlockProductId,
  thirdBlockTitle,
  thirdBlockProductId,
  posters,
}: CardGroupProps) => {
  if (posters) {
    return (
      <div className={styles.__posters}>
        {posters.map((poster: any, index: number) => {
          return (
            <div key={index}>
              <Image
                src={`/static${poster}`}
                alt="poster"
                fill
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.__card_group}>
      <div className={styles.__first_block}>
        <Image src={PatternCircles} width={900} height={900} alt="circle" />
        <div className={styles.__second_img_container}>
          <Image src={zx9Image} fill objectFit="contain" alt="speaker" />
        </div>
        <div className={styles.__content}>
          <h1>{firstBlockTitle}</h1>
          <p>{firstBlockParagraph}</p>
          <Link href={`product/${firstBlockProductId}`}>
            <Button btnContent={"see product"} btnType="outlined" />
          </Link>
        </div>
      </div>
      <div className={styles.__second_block}>
        <Image src={zx7Image} fill alt="speaker" />
        <div className={styles.__content}>
          <h4>{secondBlockTitle}</h4>
          <Link href={`product/${secondBlockProductId}`}>
            <Button btnContent={"see product"} btnType="outlined" />
          </Link>
        </div>
      </div>
      <div className={styles.__third_block}>
        <div className={styles.__product_img}>
          <Image src={yx1Image} fill objectFit="cover" alt="speaker" />
        </div>
        <div className={styles.__content}>
          <div>
            <h4>{thirdBlockTitle}</h4>
            <Link href={`product/${thirdBlockProductId}`}>
              <Button btnContent={"see product"} btnType="outlined" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGroup;
