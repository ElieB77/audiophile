import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "../Button";

const Hero = () => {
  return (
    <div className={styles.__hero}>
      <div className={styles.__background}>
        <Image
          src="/home/desktop/image-hero.jpg"
          alt="background"
          width={1400}
          height={700}
        />
      </div>
      <div className={styles.__content}>
        <p className="overline">new product</p>
        <h1>XX99 Mark II Headphones</h1>
        <p>
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <Button btnContent="see product" />
      </div>
    </div>
  );
};

export default Hero;
