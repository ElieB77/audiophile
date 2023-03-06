// Modules
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
// Styles
import "../assets/styles/globals.scss";
import "../assets/styles/index.scss";
// Components
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import TextWithImage from "../components/Layout/TextWithImage";
import CardCategories from "../components/Card/CardCategories";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
// Assets
import Logo from "../public/static/logo-audiophile.svg";

const cardCategoryData = [
  {
    imageUrl: "/shared/desktop/image-category-thumbnail-headphones.png",
    categoryName: "headphones",
    categoryHref: "/category/headphones",
  },
  {
    imageUrl: "/shared/desktop/image-category-thumbnail-speakers.png",
    categoryName: "speakers",
    categoryHref: "/category/speakers",
  },
  {
    imageUrl: "/shared/desktop/image-category-thumbnail-earphones.png",
    categoryName: "earphones",
    categoryHref: "/category/earphones",
  },
];

export default function App({ Component, pageProps }: AppProps) {
  const [pageTitle, setPageTitle] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    return setPageTitle(router.pathname.slice(1));
  }, [router.pathname]);

  const navbarColor =
    router.pathname === "/product/[id]" ||
    router.pathname === "/checkout" ||
    router.pathname === "/create-review/[id]" ||
    router.pathname === "/user-settings"
      ? "__dark_navbar __sticky_navbar"
      : undefined;

  return (
    <>
      <Head>
        <title>Audiophile - Get the most out of personal audio</title>
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      </Head>
      <AuthProvider>
        <CartProvider>
          {router.pathname !== "/order-confirmation" && (
            <Navbar overrideClassname={navbarColor} />
          )}
          <Component {...pageProps} />
          <div className="container">
            {/* <p className={"server_error"}>Server is down</p> */}
            {router.pathname !== "/" &&
              router.pathname !== "/checkout" &&
              router.pathname !== "/user-settings" &&
              router.pathname !== "/order-confirmation" &&
              router.pathname !== "/create-review/[id]" && (
                <div className="__card_categories">
                  {cardCategoryData.map((card: any, index: number) => {
                    return (
                      <CardCategories
                        key={index}
                        categoryName={card.categoryName}
                        categoryImage={`/static${card.imageUrl!}`}
                        categoryHref={card.categoryHref}
                        btnContent="SHOP"
                      />
                    );
                  })}
                </div>
              )}
            {router.pathname !== "/checkout" &&
              router.pathname !== "/user-settings" &&
              router.pathname !== "/order-confirmation" &&
              router.pathname !== "/create-review/[id]" && <TextWithImage />}
          </div>
          {router.pathname !== "/order-confirmation" && (
            <Footer
              textContent="Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week."
              imageSrc={Logo}
              copyrightContent="Copyright 2021. All Rights Reserved"
            />
          )}
        </CartProvider>
      </AuthProvider>
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
