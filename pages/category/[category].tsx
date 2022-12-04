import Navbar from "../../components/Layout/Navbar";
import ArticleInfo from "../../components/Product/ProductInfo";
import { useEffect, useState } from "react";
import { replaceString } from "../../utilities/replaceString";
import { parseData } from "../../utilities/parseData";
import Header from "../../components/Layout/Header";

interface Props {
  products?: any;
  category?: string;
}

const Category = ({ products, category }: Props) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData(products.rows);
  }, [category]);

  return (
    <>
      <Navbar />
      <Header title={category} />
      <div className="container">
        {data &&
          data.map((product: any, index: number) => {
            const images = parseData(product.images);
            const image = replaceString(images[0].desktop, "./assets", "");
            const isNew = product.new === 1 ? true : false;
            return (
              <ArticleInfo
                key={index}
                name={product.name}
                image={image}
                description={product.description}
                index={index}
                isNew={isNew}
                id={product.id}
              />
            );
          })}
      </div>
    </>
  );
};

export async function getStaticProps(params: any) {
  const data = await fetch(
    `http://localhost:3001/category/${params.params.category}`
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
  const productData = await fetch("http://localhost:3001/products");
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
