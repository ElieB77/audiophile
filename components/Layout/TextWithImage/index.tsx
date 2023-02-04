// Styles
import styles from "./styles.module.scss";
// Modules
import Image from "next/image";
// Assets
import BestGear from "../../../public/static/shared/desktop/image-best-gear.jpg";
import BestGearTablet from "../../../public/static/shared/tablet/image-best-gear.jpg";

const TextWithImage = () => {
  return (
    <div className={styles.__text_with_image}>
      <div className={styles.__text}>
        <h2>
          bringing you the <span>best</span> audio gear
        </h2>
        <p>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className={styles.__image}>
        <Image
          className={styles.__best_gear_desktop}
          src={BestGear}
          alt="Portrait"
          fill
          objectFit="cover"
        />
        <Image
          className={styles.__best_gear_tablet}
          src={BestGearTablet}
          alt="Portrait"
          fill
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default TextWithImage;
