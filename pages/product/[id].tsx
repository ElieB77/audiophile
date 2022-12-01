// Modules
import { useEffect, useState } from "react";
// Components
import ArticleAccessories from "../../components/ArticleAccessories";
import ArticleInfo from "../../components/ArticleInfo";
import CardGroup from "../../components/CardGroup";
import ProductRecommendation from "../../components/ProductRecommendation";
// Utils
import { parseData, replaceString } from "../../utilities";

interface Props {
  product: any;
  products: any;
}

const Product = ({ product, products }: Props) => {
  const [data, setData] = useState<{ [key: string]: any }>({});

  const productData = product.rows;
  const productsData = products.rows;

  let productRecommendedList: any[] = [];
  let galleryList: any[] = [];

  const productImages = parseData(productData[0].images);
  const productImage = replaceString(productImages[0].desktop, "./assets", "");
  const accessoriesList = parseData(productData[0].includes);
  const gallery = parseData(productData[0].gallery);

  Object.keys(gallery).map((item) => {
    galleryList.push(replaceString(gallery[item].desktop, "./assets", ""));
  });

  productsData
    .sort(() => 0.5 - Math.random())
    .filter((product: any) => product.id !== productData[0].id)
    .slice(0, 3)
    .map((el: any) => {
      let images = parseData(el.images);
      let image = replaceString(images[0].desktop, "./assets", "");

      const obj = {
        name: el.name,
        id: el.id,
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
    });
  }, [productData]);

  console.log(data);

  return (
    <div className="container">
      <ArticleInfo
        image={data.image}
        name={data.name}
        description={data.description}
        price={data.price}
        showCounterQuantity
        isNew={data.new === 1 ? true : false}
      />
      <ArticleAccessories
        content={data.features}
        accessories={data.accessories}
      />
      <CardGroup posters={data.gallery} />
      <h3 style={{ textAlign: "center", marginTop: "160px" }}>
        you may also like
      </h3>
      <div style={{ display: "flex", gap: "30px" }}>
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
    `http://localhost:3001/product/${params.params.id}`
  );
  const response1 = await productData1.json();

  const productData2 = await fetch("http://localhost:3001/products");
  const response2 = await productData2.json();

  return {
    props: {
      product: response1,
      products: response2,
    },
  };
}

export async function getStaticPaths() {
  const productData = await fetch("http://localhost:3001/products");
  const response = await productData.json();

  return {
    paths: response.rows.map((product: any) => {
      const id = product.id.toString();
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
