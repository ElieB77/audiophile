// Styles
import styles from "../styles/pages/home.module.scss";
// Components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CardCategories from "../components/CardCategories";
import CardGroup from "../components/CardGroup";
import TextWithImage from "../components/TextWithImage";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero
        heroOverline="new product"
        heroTitle="XX99 Mark II Headphones"
        heroParagraph=" Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast."
      />
      <div className="container">
        {/* <div className={styles.__card_categories}>
          {cardCategoryData.map((card: any, index: number) => {
            return (
              <CardCategories
                key={index}
                categoryName={card.categoryName}
                categoryImage={card.imageUrl!}
                categoryHref={card.categoryHref}
                width={card.width}
                height={card.height}
              />
            );
          })}
        </div> */}
        <CardGroup
          firstBlockTitle="zx9 speaker"
          firstBlockParagraph="Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound."
          secondBlockTitle="zx7 speaker"
          thirdBlockTitle="yx1 earphone"
        />
      </div>
    </>
  );
}
