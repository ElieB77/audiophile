import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "../Button";

const CardGroup = () => {
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
          <h1>zx9 speaker</h1>
          <p>
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
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
          <h4>zx7 speaker</h4>
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
            <h4>yx1 earphones</h4>
            <Button btnContent={"see product"} btnType="outlined" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGroup;
