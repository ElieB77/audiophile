import CardCategories from "../components/CardCategories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/pages/home.module.scss";

export default function Home() {
  const cardCategoryData = [
    {
      imageUrl: "/headphone.png",
      categoryName: "headphones",
      categoryHref: "/headphones",
      width: 120,
      height: 160,
    },
    {
      imageUrl: "/speaker.png",
      categoryName: "speakers",
      categoryHref: "/speakers",
      width: 120,
      height: 146,
    },
    {
      imageUrl: "/earphone.png",
      categoryName: "earphones",
      categoryHref: "/earphones",
      width: 125,
      height: 126,
    },
  ];
  return (
    <>
      <Navbar />
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
      {/* <Footer
        textContent="Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week."
        imageSrc="/logo-audiophile.svg"
        copyrightContent="Copyright 2021. All Rights Reserved"
      /> */}
    </>
  );
}
