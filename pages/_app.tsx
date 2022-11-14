// Modules
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Styles
import "../styles/globals.scss";
import "../styles/index.scss";
// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TextWithImage from "../components/TextWithImage";
import CardCategories from "../components/CardCategories";
import Header from "../components/Header";

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

export default function App({ Component, pageProps }: AppProps) {
  const [pageTitle, setPageTitle] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    return setPageTitle(router.pathname.slice(1));
  }, [router.pathname]);

  return (
    <>
      <Navbar />
      {router.pathname !== "/" && <Header title={pageTitle} />}
      <Component {...pageProps} />
      <div className="container">
        <div className="__card_categories">
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
        </div>
        <TextWithImage />
      </div>
      <Footer
        textContent="Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week."
        imageSrc="/logo-audiophile.svg"
        copyrightContent="Copyright 2021. All Rights Reserved"
      />
    </>
  );
}
