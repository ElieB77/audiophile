// Styles
import styles from "./styles.module.scss";
// Modules
import Image from "next/image";
import Link from "next/link";
// Assets
import FacebookLogo from "../../../assets/public/facebook-logo.svg";
import TwitterLogo from "../../../assets/public/twitter-logo.svg";
import InstaLogo from "../../../assets/public/insta-logo.svg";

interface footerLinksProps {
  textContent: string;
  imageSrc: string;
  copyrightContent: string;
}

const footerLinks = [
  { text: "home", href: "/" },
  { text: "headphones", href: "/category/headphones" },
  { text: "speakers", href: "/category/speakers" },
  { text: "earphones", href: "/category/earphones" },
];

const footerSocials = [FacebookLogo, TwitterLogo, InstaLogo];

const Footer = ({
  textContent,
  imageSrc,
  copyrightContent,
}: footerLinksProps) => {
  return (
    <div className={styles.__footer}>
      {/* <div className="container"> */}
      <div className={styles.__left_block}>
        <Image src={imageSrc} alt="Logo" width={143} height={25} />
        <p>{textContent}</p>
        <p>{copyrightContent}</p>
      </div>
      <div className={styles.__right_block}>
        <div className={styles.__links}>
          {footerLinks.map((link: any, index: number) => {
            return (
              <Link key={index} href={link.href}>
                {link.text}
              </Link>
            );
          })}
        </div>
        <div className={styles.__socials_icons}>
          {footerSocials.map((iconUrl: any, index: number) => {
            return (
              <Image
                key={index}
                src={iconUrl}
                alt="social media"
                width={24}
                height={24}
              />
            );
          })}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Footer;
