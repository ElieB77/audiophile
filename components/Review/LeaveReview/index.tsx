import Link from "next/link";
import Button from "../../UI/Button";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface LeaveReviewProps {
  productId?: any;
}

const LeaveReview = ({ productId }: LeaveReviewProps) => {
  const router = useRouter();
  return (
    <div className={styles.__leave_review}>
      <h6>Review this product</h6>
      <p>Share your thoughts with other customers.</p>
      <Button
        btnContent={"leave a review"}
        onClick={() =>
          router.push(`/create-review/${productId}`, undefined, {
            shallow: true,
          })
        }
      />
    </div>
  );
};

export default LeaveReview;
