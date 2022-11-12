import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function Home() {
  return (
    <>
      <Navbar />
      <Button btnContent="shop" btnType="borderless" btnIcon />
      <Footer
        textContent="Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week."
        imageSrc="/logo-audiophile.svg"
        copyrightContent="Copyright 2021. All Rights Reserved"
      />
    </>
  );
}
