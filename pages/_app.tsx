// Modules
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
// Styles
import "../assets/styles/globals.scss";
import "../assets/styles/index.scss";
// Components
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import TextWithImage from "../components/Layout/TextWithImage";
import CardCategories from "../components/Card/CardCategories";
import { CartProvider } from "../context/CartContext";
// Assets
import Logo from "../assets/public/logo-audiophile.svg";

const cardCategoryData = [
  {
    imageUrl: "/shared/desktop/image-category-thumbnail-headphones.png",
    categoryName: "headphones",
    categoryHref: "/category/headphones",
    width: 200,
    height: 200,
  },
  {
    imageUrl: "/shared/desktop/image-category-thumbnail-speakers.png",
    categoryName: "speakers",
    categoryHref: "/category/speakers",
    width: 200,
    height: 200,
  },
  {
    imageUrl: "/shared/desktop/image-category-thumbnail-earphones.png",
    categoryName: "earphones",
    categoryHref: "/category/earphones",
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

  const navbarColor =
    router.pathname === "/product/[id]" || router.pathname === "/checkout"
      ? "__dark_navbar"
      : undefined;

  return (
    <>
      <CartProvider>
        <Navbar overrideClassname={navbarColor} />
        <Component {...pageProps} />
        <div className="container">
          {router.pathname !== "/" && router.pathname !== "/checkout" && (
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
                    btnContent="SHOP"
                  />
                );
              })}
            </div>
          )}
          {router.pathname !== "/checkout" && <TextWithImage />}
        </div>
        <Footer
          textContent="Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week."
          imageSrc={Logo}
          copyrightContent="Copyright 2021. All Rights Reserved"
        />
      </CartProvider>
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}`);
  const response = await data.json();

  return {
    props: {
      response,
    },
  };
}
