import Input from "../../components/UI/Input";
import styles from "../../assets/styles/pages/checkout.module.scss";
import Button from "../../components/UI/Button";
import { useRouter } from "next/router";
import CartSummary from "../../components/Cart/CartSummary";
import SuccessModal from "../../components/Popups/SuccessModal";
import { useCartModal } from "../../hooks/useCartModal";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";

const Checkout = () => {
  const [isShowingSuccessModal, toggleSuccessModal] = useCartModal();
  const { cartQuantity } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartQuantity < 1) {
      router.push("/");
    }
  }, [cartQuantity, router]);
  return (
    <>
      <SuccessModal
        show={isShowingSuccessModal}
        handleClick={toggleSuccessModal}
      />
      <div className={styles.__checkout}>
        <div className={`container ${styles.__container}`}>
          <div className={styles.__go_back_btn} onClick={() => router.back()}>
            <Button btnContent="go back" btnType="borderless" />
          </div>
          <div className={styles.__wrapper}>
            <div className={styles.__form}>
              <h3>checkout</h3>
              <div className={styles.__billing_details}>
                <p className="sub_title">billing details</p>
                <div className={styles.__input_group}>
                  <Input placeholder="Alexei Ward" label="Name" />
                  <Input placeholder="alexei@mail.com" label="Email" />
                </div>
                <Input placeholder="+1 202-555-0136" label="number" />
              </div>
              <div className={styles.__shipping_info}>
                <p className="sub_title">shipping info</p>
                <Input
                  placeholder="1137 Williams Avenue"
                  label="Adress"
                  isFullWidth
                />
                <div className={styles.__input_group}>
                  <Input placeholder="10001" label="ZIP Code" />
                  <Input placeholder="New York" label="City" />
                </div>
                <Input placeholder="United States" label="Country" />
              </div>
              <div className={styles.__payment_details}>
                <p className="sub_title">payment details</p>
                <div className={styles.__input_group}>
                  <Input label="Cash on Delivery" isRadio />
                  <Input label="e-Money" isRadio />
                </div>
              </div>
            </div>
            <div className={styles.__summary}>
              <CartSummary onClick={toggleSuccessModal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
