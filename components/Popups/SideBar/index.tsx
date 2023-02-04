// Styles
import styles from "./styles.module.scss";
// Assets
import CloseIcon from "../../../public/static/close-icon.svg";
// Modules
import Image from "next/image";
import Link from "next/link";

interface SideBarProps {
  show?: any;
  handleClick?: any;
  navbarLinks?: any;
}

const SideBar = ({ show, handleClick, navbarLinks }: SideBarProps) => {
  return (
    show && (
      <>
        <div onClick={handleClick} className={styles.__overlay}></div>
        <div className={styles.__side_bar}>
          <div className={styles.__close_icon} onClick={handleClick}>
            <Image src={CloseIcon} alt="Close" width={25} height={25} />
          </div>
          <div className={styles.__links}>
            {navbarLinks.map((link: any, index: number) => {
              return (
                <Link
                  onClick={handleClick}
                  href={link.href}
                  key={index}
                  className={link.active}
                >
                  {link.text}
                </Link>
              );
            })}
          </div>
        </div>
      </>
    )
  );
};

export default SideBar;
