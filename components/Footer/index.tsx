import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
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

const footerSocials = [
  "/facebook-logo.svg",
  "/twitter-logo.svg",
  "/insta-logo.svg",
];

const Footer = ({ textContent, imageSrc, copyrightContent }: Props) => {
  const router = useRouter();
  return (
    <div className={styles.__footer}>
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
  );
};

export default Footer;
