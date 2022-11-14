import styles from "../styles/pages/home.module.scss";
// Components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CardCategories from "../components/CardCategories";
import CardGroup from "../components/CardGroup";

export default function Home() {
  const cardCategoryData = [
    {
      imageUrl: "/shared/desktop/image-category-thumbnail-headphones.png",
      categoryName: "headphones",
      categoryHref: "/headphones",
      width: 200,
      height: 200,
    },
    {
      imageUrl: "/shared/desktop/image-category-thumbnail-speakers.png",
      categoryName: "speakers",
      categoryHref: "/speakers",
      width: 200,
      height: 200,
    },
    {
      imageUrl: "/shared/desktop/image-category-thumbnail-earphones.png",
      categoryName: "earphones",
      categoryHref: "/earphones",
      width: 200,
      height: 200,
    },
  ];
  return (
    <>
      <Navbar />
      <Hero
        heroOverline="new product"
        heroTitle="XX99 Mark II Headphones"
        heroParagraph=" Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast."
      />
      <div className="container">
        <div className={styles.__card_categories}>
          {cardCategoryData.map((card: any, index: number) => {
            console.log(card.imageUrl);
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
        </div>
        <CardGroup />
      </div>
      <Footer
        textContent="Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week."
        imageSrc="/logo-audiophile.svg"
        copyrightContent="Copyright 2021. All Rights Reserved"
      />
    </>
  );
}
