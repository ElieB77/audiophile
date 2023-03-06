import { useEffect, useState } from "react";
import StarRatings from "../StarRatings";
import styles from "./styles.module.scss";
import Image from "next/image";

interface CustomerReviewProps {
  name?: string;
  title?: string;
  content?: string;
  rating?: Number;
  avatar?: any;
}

const CustomerReview = ({
  name,
  title,
  content,
  rating,
  avatar,
}: CustomerReviewProps) => {
  return (
    <div className={styles.__customer_review}>
      <div className={styles.__user_info}>
        <div className={styles.__profile}>
          <Image src={avatar} alt="profile" width={30} height={30} />
        </div>
        <p>{name}</p>
      </div>
      <div className={styles.__title}>
        <StarRatings count={rating} />
        <p>{title}</p>
      </div>
      <div className={styles.__content}>{content}</div>
    </div>
  );
};

export default CustomerReview;
