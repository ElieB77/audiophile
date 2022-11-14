import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "../Button";

interface Props {
  heroOverline?: string;
  heroTitle?: string;
  heroParagraph?: string;
}

const Hero = ({ heroOverline, heroTitle, heroParagraph }: Props) => {
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
        <p className="overline">{heroOverline}</p>
        <h1>{heroTitle}</h1>
        <p>{heroParagraph}</p>
        <Button btnContent="see product" />
      </div>
    </div>
  );
};

export default Hero;
