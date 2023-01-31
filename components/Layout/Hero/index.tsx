// Styles
import styles from "./styles.module.scss";
// Modules
import Image from "next/image";
import Link from "next/link";
// Components
import Button from "../../UI/Button";
// Assets
import ImageHero from "../../../public/static/home/desktop/image-hero.jpg";
import ImageHeroTablet from "../../../public/static/home/tablet/image-header.jpg";
import ImageHeroMobile from "../../../public/static/home/mobile/image-header.jpg";

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
          className={styles.__image_hero_desktop}
          src={ImageHero}
          alt="background"
          width={1400}
          height={700}
        />
        <Image
          className={styles.__image_hero_tablet}
          src={ImageHeroTablet}
          alt="background"
          width={700}
          height={700}
        />
        <Image
          className={styles.__image_hero_mobile}
          src={ImageHeroMobile}
          alt="background"
          width={100}
          height={100}
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
