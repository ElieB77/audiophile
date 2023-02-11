import Button from "../../UI/Button";
import ProgressBar from "../../UI/ProgressBar";
import StarRatings from "../StarRatings";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const ReviewDetails = () => {
  const router = useRouter();
  return (
    <div className={styles.__review_details}>
      <div className={styles.__wrapper}>
        <p className={styles.__ratio}>
          5 out of 5
          <span>
            <StarRatings showStarsOnly />
          </span>
        </p>
        {[...Array(5)].map((el: any, index: any) => {
          return (
            <div className={styles.__stats} key={index}>
              <p>
                {index + 1} {index > 0 ? "stars" : "star"}
              </p>
              <ProgressBar />
              <p>0%</p>
            </div>
          );
        })}
        <div className={styles.__show_all_reviews}>
          {router.pathname === "/product/[id]" && (
            <Link href="#customer-review" scroll={false}>
              <Button
                btnContent={"Show all reviews (1)"}
                btnType="borderless"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
