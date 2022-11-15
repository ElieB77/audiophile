import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "../Button";

interface Props {
  firstBlockTitle?: string;
  firstBlockParagraph?: string;
  secondBlockTitle?: string;
  thirdBlockTitle?: string;
  posters?: string[];
}

const CardGroup = ({
  firstBlockTitle,
  firstBlockParagraph,
  secondBlockTitle,
  thirdBlockTitle,
  posters,
}: Props) => {
  if (posters) {
    return (
      <div className={styles.__posters}>
        {posters.map((poster: any, index: number) => {
          return (
            <div key={index}>
              <Image src={poster} alt="poster" fill objectFit="cover" />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.__card_group}>
      <div className={styles.__first_block}>
        <Image
          src="/home/desktop/pattern-circles.svg"
          width={900}
          height={900}
          alt="circle"
        />
        <div className={styles.__second_img_container}>
          <Image
            src="/home/desktop/image-speaker-zx9.png"
            fill
            objectFit="contain"
            alt="speaker"
          />
        </div>
        <div className={styles.__content}>
          <h1>{firstBlockTitle}</h1>
          <p>{firstBlockParagraph}</p>
          <Button btnContent={"see product"} btnType="outlined" />
        </div>
      </div>
      <div className={styles.__second_block}>
        <Image
          src="/home/desktop/image-speaker-zx7.jpg"
          fill
          objectFit="cover"
          alt="speaker"
        />
        <div className={styles.__content}>
          <h4>{secondBlockTitle}</h4>
          <Button btnContent={"see product"} btnType="outlined" />
        </div>
      </div>
      <div className={styles.__third_block}>
        <div>
          <Image
            src="/home/desktop/image-earphones-yx1.jpg"
            fill
            objectFit="cover"
            alt="speaker"
          />
        </div>
        <div className={styles.__content}>
          <div>
            <h4>{thirdBlockTitle}</h4>
            <Button btnContent={"see product"} btnType="outlined" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGroup;
