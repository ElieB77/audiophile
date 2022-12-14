// Styles
import styles from "./styles.module.scss";
// Modules
import Image from "next/image";
import Link from "next/link";
// Components
import Button from "../../UI/Button";

interface HeroProps {
  heroOverline?: string;
  heroTitle?: string;
  heroParagraph?: string;
  productId?: string;
}

const Hero = ({
  heroOverline,
  heroTitle,
  heroParagraph,
  productId,
}: HeroProps) => {
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
        <Link href={`/product/${productId}`}>
          <Button btnContent="see product" />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
