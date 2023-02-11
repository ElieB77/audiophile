import { useEffect, useState } from "react";
import styles from "../../assets/styles/pages/create-review.module.scss";
import StarRatings from "../../components/Review/StarRatings";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Image from "next/image";
import { replaceString } from "../../utilities/replaceString";

interface Props {
  product: any;
}

const CreateReview = ({ product }: Props) => {
  const [data, setData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    setData({
      name: product.rows[0].name,
      image: replaceString(product.rows[0].cart_image, "public", "/static"),
    });
  }, [product]);

  return (
    <div className={styles.__create_review}>
      <div className={styles.__container}>
        <h5>Leave a review</h5>
        <div className={styles.__product}>
          <Image src={data.image} alt="product" width={50} height={50} />
          <p>{data.name}</p>
        </div>
        <hr />
        <div className={styles.__overall_note}>
          <p>Overall note</p>
          <StarRatings ratingSystem />
        </div>
        <hr />
        <div className={styles.__add_title}>
          <p>Add a title</p>
          <Input
            placeholder="Enter a descriptive title for your review"
            isFullWidth
          />
        </div>
        <div className={styles.__write_review}>
          <p>Share your experience</p>
          <Input
            placeholder="Tell us what you liked or disliked about the product"
            isFullWidth
            isTextArea
          />
        </div>
        <Button btnContent="Send" />
      </div>
    </div>
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
