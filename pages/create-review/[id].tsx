import { useEffect, useState } from "react";
import styles from "../../assets/styles/pages/create-review.module.scss";
import StarRatings from "../../components/Review/StarRatings";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Image from "next/image";
import { replaceString } from "../../utilities/replaceString";
import { formValidation } from "../../utilities/formValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

interface Props {
  product: any;
}

const CreateReview = ({ product }: Props) => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [rating, setRating] = useState<number>(0);
  const [errors, setErrors] = useState<any>();
  const [errorRating, setErrorRating] = useState<any>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [values, setValues] = useState<any>({
    content: "",
    title: "",
  });
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setData({
      name: product.rows[0].name,
      image: replaceString(product.rows[0].cart_image, "public", "/static"),
    });
  }, [product]);

  const handleSubmit = async () => {
    if (!isLoggedIn()) {
      return toast(
        "To leave a review, you must be logged in. Please log in or create an account to continue.",
        {
          autoClose: 5000,
          type: "warning",
        }
      );
    }

    const [isValid, error] = formValidation(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      values.title,
      values.content
    );
    if (isValid && rating !== 0) {
      const token = localStorage.getItem("token");
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_CREATE_REVIEW}`, {
          method: "POST",
          body: JSON.stringify({
            product_id: product.rows[0].item_id,
            title: values.title,
            content: values.content,
            rating: rating,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await data.json();
        if (response.status === 201) {
          setIsSubmit(true);
          setValues({ title: "", content: "" });
          toast.success("Your review has been successfully submitted!");
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else if (response.status === 400) {
          toast.error("You have already submitted a review for this product.");
          setIsSubmit(false);
          setDisabled(true);
          setTimeout(() => {
            router.back();
          }, 3000);
        }
      } catch (error) {
        setIsSubmit(false);
        throw error;
      }
    }
    setErrors(error);
    setErrorRating("Overall note is required");
  };

  return (
    <>
      <div className={styles.__create_review}>
        <div className={styles.__container}>
          <div className={styles.__head}>
            <h5>Leave a review</h5>
            <div className={styles.__go_back_btn} onClick={() => router.back()}>
              <Button btnContent="go back" btnType="borderless" />
            </div>
          </div>
          <div className={styles.__product}>
            <Image src={data.image} alt="product" width={50} height={50} />
            <p>{data.name}</p>
          </div>
          <hr />
          <div className={styles.__overall_note}>
            <p>Overall note</p>
            <StarRatings
              ratingSystem
              rating={rating}
              setRating={setRating}
              isSubmit={isSubmit}
            />
            {rating === 0 && !isSubmit && (
              <p className={styles.__error_ratings}>{errorRating}</p>
            )}
          </div>
          <hr />
          <div className={styles.__add_title}>
            <p>Add a title</p>

            <div>
              <Input
                error={
                  errors &&
                  errors.find((err: { input: string }) => err.input === "title")
                }
                placeholder="Enter a descriptive title for your review"
                isFullWidth
                type="text"
                value={values.title}
                onChange={(e: { target: { value: any } }) =>
                  setValues({
                    ...values,
                    title: e.target.value,
                  })
                }
              />
              {errors &&
                errors.map((err: any, index: any) => {
                  if (err.input === "title") {
                    return (
                      <p className={styles.__error_message} key={index}>
                        {err.message}
                      </p>
                    );
                  }
                })}
            </div>
          </div>
          <div className={styles.__write_review}>
            <p>Share your experience</p>

            <div>
              <Input
                error={
                  errors &&
                  errors.find(
                    (err: { input: string }) => err.input === "content"
                  )
                }
                placeholder="Tell us what you liked or disliked about the product"
                isFullWidth
                type="text"
                isTextArea
                value={values.content}
                onChange={(e: { target: { value: any } }) =>
                  setValues({
                    ...values,
                    content: e.target.value,
                  })
                }
              />
              {errors &&
                errors.map((err: any, index: any) => {
                  if (err.input === "content") {
                    return (
                      <p className={styles.__error_message} key={index}>
                        {err.message}
                      </p>
                    );
                  }
                })}
            </div>
          </div>
          <Button
            btnContent="Send"
            onClick={handleSubmit}
            disabled={disabled}
          />
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
};

export async function getStaticProps(params: any) {
  const productData = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_URL}/${params.params.id}`
  );
  const response = await productData.json();

  return {
    props: {
      product: response,
    },
  };
}

export async function getStaticPaths() {
  const productData = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}`);
  const response = await productData.json();

  return {
    paths: response.rows.map((product: any) => {
      const id = product.item_id.toString();
      return {
        params: {
          id,
        },
      };
    }),
    fallback: false,
  };
}

export default CreateReview;
