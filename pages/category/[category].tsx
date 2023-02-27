// Components
import Navbar from "../../components/Layout/Navbar";
import ProductInfo from "../../components/Product/ProductInfo";
import Header from "../../components/Layout/Header";
// Modules
import { useEffect, useState } from "react";
// Utilities
import { replaceString } from "../../utilities/replaceString";
import StarRatings from "../../components/Review/StarRatings";

interface Props {
  products?: any;
  category?: string;
}

const Category = ({ products, category }: Props) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData(products.rows);
  }, [category, products.rows]);

  return (
    <>
      <Navbar />
      <Header title={category} />
      <div className="container product_info_category_page">
        {data &&
          data.map((product: any, index: number) => {
            const images = product.images;
            const image = replaceString(images[0].desktop, "./assets", "");
            const isNew = product.new === 1 ? true : false;
            return (
              <ProductInfo
                key={index}
                name={product.name}
                image={image}
                description={product.description}
                index={index}
                isNew={isNew}
                id={product.item_id}
                price={0}
                count={product.avg_rating}
                reviewLength={product.ratings_length}
              />
            );
          })}
      </div>
    </>
  );
};

export async function getStaticProps(params: any) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_CATEGORY_URL}/${params.params.category}`
  );
  const response = await data.json();

  return {
    props: {
      products: response,
      category: params.params.category,
    },
  };
}

export async function getStaticPaths() {
  const productData = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}`);
  const response = await productData.json();

  return {
    paths: response.rows.map((product: any) => {
      const category = product.category;
      return {
        params: {
          category,
        },
      };
    }),
    fallback: false,
  };
}

export default Category;
