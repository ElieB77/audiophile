import StarRatings from "../StarRatings";
import styles from "./styles.module.scss";

const CustomerReview = () => {
  return (
    <div className={styles.__customer_review}>
      <div className={styles.__user_info}>
        <div className={styles.__profile}></div>
        <p>Name</p>
      </div>
      <div className={styles.__title}>
        <StarRatings showStarsOnly />
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className={styles.__content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolore
        ipsum culpa animi voluptate tempora soluta libero ad, eum, temporibus
        laborum saepe dignissimos. Labore, commodi? Repellendus voluptatibus
        eligendi quasi. Voluptate neque natus assumenda commodi unde odit,
        incidunt iste fugiat totam.
      </div>
    </div>
  );
};

export default CustomerReview;
