import styles from "./styles.module.scss";
import Image from "next/image";

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
      </div>
    </div>
  );
};

export default Hero;
