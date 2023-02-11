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
}

const StarRatings = ({ showStarsOnly, ratingSystem }: StarRatingsProps) => {
  const [rating, setRating] = useState<number>(0);
  const [stars, setStars] = useState<any>();
  const [hover, setHover] = useState<number>(0);

  useEffect(() => {
    setStars(
      !ratingSystem
        ? [...Array(5)].map((index) => <span key={index}>&#9733;</span>)
        : [...Array(5)].map((star, index) => {
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
                    index <= ((rating && hover) || hover)
                      ? styles.__active
                      : styles.__off
                  }
                >
                  &#9733;
                </span>
              </button>
            );
          })
    );
  }, [rating, hover]);

  return ratingSystem ? (
    <>{stars}</>
  ) : (
    <div className={styles.__star_ratings}>
      {!showStarsOnly && <p>5</p>}
      <div className={styles.__stars}>
        <span>{stars}</span>
      </div>
      {!showStarsOnly && (
        <>
          <Image src={DownArrow} alt="Arrow" width={10} height={10} />
          <p>(1)</p>
        </>
      )}
    </div>
  );
};

export default StarRatings;
