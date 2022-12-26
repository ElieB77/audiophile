import Input from "../../components/UI/Input";
import styles from "../../assets/styles/pages/checkout.module.scss";

const Checkout = () => {
  return (
    <div className={styles.__checkout}>
      <div className={`container ${styles.__container}`}>
        <button>GO BACK</button>
        <div className={styles.__wrapper}>
          <div className={styles.__form}>
            <h3>checkout</h3>
            <div className={styles.__billing_details}>
              <p className="sub_title">billing details</p>
              <div className={styles.__input_group}>
                <Input label="Name" />
                <Input label="Email" />
              </div>
              <Input label="Phone number" />
            </div>
            <div className={styles.__shipping_info}>
              <p className="sub_title">shipping info</p>
              <Input label="Adress" isFullWidth />
              <div className={styles.__input_group}>
                <Input label="ZIP Code" />
                <Input label="City" />
              </div>
              <Input label="Country" placeholder="United States" />
            </div>
            <div className={styles.__payment_details}>
              <p className="sub_title">payment details</p>
              <div className={styles.__input_group}>
                <Input label="Payment method" isCheckbox />
              </div>
            </div>
          </div>
          <div className={styles.__summary}></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
