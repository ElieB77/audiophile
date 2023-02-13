// Styles
import styles from "./styles.module.scss";
// Modules
import Image from "next/image";
// Assets
import DownArrow from "../../../public/static/angle-down-solid.svg";
import { useEffect, useState } from "react";

interface StarRatingsProps {
  showStarsOnly?: any;
  ratingSystem?: boolean;
  count?: Number;
  rating?: any;
  setRating?: any;
  isSubmit?: any;
}

const StarRatings = ({
  ratingSystem,
  count,
  rating,
  setRating,
  isSubmit,
}: StarRatingsProps) => {
  const [stars, setStars] = useState<any>();
  const [hover, setHover] = useState<number>(0);

  useEffect(() => {
    ratingSystem
      ? setStars(
          [...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                className={styles.__rating_system}
                key={index}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span
                  className={
                    index <= ((rating && hover) || hover) && !isSubmit
                      ? styles.__active
                      : styles.__off
                  }
                >
                  &#9733;
                </span>
              </button>
            );
          })
        )
      : setStars(
          [...Array(5)].map((star: any, index: number) => {
            index += 1;
            return (
              <>
                <span
                  className={index <= count! ? styles.__active : styles.__off}
                  key={index}
                >
                  &#9733;
                </span>
              </>
            );
          })
        );
  }, [rating, hover, count, ratingSystem, setRating, isSubmit]);

  return ratingSystem ? <div>{stars}</div> : <>{stars}</>;
};

export default StarRatings;
