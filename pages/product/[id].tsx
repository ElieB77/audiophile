// Modules
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Components
import ArticleAccessories from "../../components/Product/ProductAccessories";
import ProductInfo from "../../components/Product/ProductInfo";
import CardGroup from "../../components/Card/CardGroup";
import ProductRecommendation from "../../components/Product/ProductRecommendation";
import Button from ".././../components/UI/Button";
import CustomerReview from "../../components/Review/CustomerReview";
// Styles
import styles from "../../assets/styles/pages/product.module.scss";
// Utilities
import { replaceString } from "../../utilities/replaceString";
import LeaveReview from "../../components/Review/LeaveReview";
import StarRatings from "../../components/Review/StarRatings";
import AvatarDefault from "../../public/static/avatar-default.png";

interface Props {
  product: any;
  products: any;
  review: any;
}

const Product = ({ product, products, review }: Props) => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [dataReview, setDataReview] = useState<any>();
  const [averageRating, setAverageRating] = useState<number>(0);
  const router = useRouter();

  const productData = product.rows;
  const productsData = products.rows;
  const reviews = review.rows;

  let productRecommendedList: any[] = [];
  let galleryList: any[] = [];

  const productImages = productData[0].images;
  const productImage = replaceString(productImages[0].desktop, "./assets", "");
  const accessoriesList = productData[0].includes;
  const gallery = productData[0].gallery;

  Object.keys(gallery).map((item) => {
    galleryList.push(replaceString(gallery[item].desktop, "./assets", ""));
  });

  productsData
    .sort(() => 0.5 - Math.random())
    .filter((product: any) => product.item_id !== productData[0].item_id)
    .slice(0, 3)
    .map((el: any) => {
      let images = el.images;
      let image = replaceString(images[0].desktop, "./assets", "");

      const obj = {
        name: el.short_name,
        id: el.item_id,
        image: image,
      };
      productRecommendedList.push(obj);
    });

  useEffect(() => {
    setData({
      name: productData[0].name,
      image: productImage,
      description: productData[0].description,
      features: productData[0].features,
      price: productData[0].price,
      accessories: accessoriesList,
      gallery: galleryList,
      recommended: productRecommendedList,
      new: productData[0].new,
      id: productData[0].item_id,
      cartImage: productData[0].cart_image,
      cartName: productData[0].short_name,
    });

    setDataReview(reviews);

    setAverageRating(
      reviews.reduce((acc: any, rev: any) => acc + rev.rating, 0) /
        reviews.length
    );
  }, [productData, reviews, averageRating]);

  return (
    <div className="container">
      <div className={styles.__go_back_btn} onClick={() => router.back()}>
        <Button btnContent="go back" btnType="borderless" />
      </div>
      <ProductInfo
        image={data.image}
        name={data.name}
        description={data.description}
        price={data.price}
        showCounterQuantity
        isNew={data.new === 1 ? true : false}
        id={data.id}
        cartImage={data.cartImage}
        cartName={data.cartName}
        count={isNaN(averageRating) ? 0 : averageRating}
        reviewLength={reviews.length}
      />
      <ArticleAccessories
        content={data.features}
        accessories={data.accessories}
      />
      <CardGroup posters={data.gallery} />
      <div className={styles.__review_container} id="customer-review">
        <LeaveReview productId={data.id} />
        <div>
          {reviews.length !== 0 ? (
            dataReview &&
            dataReview.map((review: any, index: number) => {
              console.log(review.avatar);
              return (
                <CustomerReview
                  key={index}
                  name={review.name}
                  title={review.title}
                  content={review.content}
                  rating={review.rating}
                  avatar={
                    review.avatar !== null
                      ? `${process.env.NEXT_PUBLIC_BASE_URL}/${review.avatar}`
                      : AvatarDefault
                  }
                />
              );
            })
          ) : (
            <p>
              Be the first to share your experience with us! Leave a review and
              let others know what you think about our product.
            </p>
          )}
        </div>
      </div>
      <h3 style={{ textAlign: "center", marginTop: "160px" }}>
        you may also like
      </h3>
      <div className={styles.__recommended_products}>
        {data.recommended &&
          data.recommended.map((product: any, index: number) => {
            return (
              <ProductRecommendation
                key={index}
                productImage={product.image}
                productName={product.name}
                productSlug={product.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export async function getStaticProps(params: any) {
  const productData1 = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_URL}/${params.params.id}`
  );
  const response1 = await productData1.json();

  const productData2 = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}`);
  const response2 = await productData2.json();

  const review1 = await fetch(
    `${process.env.NEXT_PUBLIC_GET_REVIEW}/${params.params.id}`
  );
  const reviewResponse1 = await review1.json();

  return {
    props: {
      product: response1,
      products: response2,
      review: reviewResponse1,
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

export default Product;
