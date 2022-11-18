// import { useRouter } from "next/router";
// import ArticleAccessories from "../../components/ArticleAccessories";
// import ArticleInfo from "../../components/ArticleInfo";
// import CardGroup from "../../components/CardGroup";
// import ProductRecommendation from "../../components/ProductRecommendation";

// const headphonesData = [
//   {
//     isNew: true,
//     product_name: "zx9 speaker",
//     product_description:
//       "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
//     product_image:
//       "/product-zx9-speaker/desktop/image-category-page-preview.jpg",
//     price: 1750,
//     product_content: `These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.

//     More than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.`,
//     product_accessories: [
//       {
//         accessory: "headphone unit",
//         quantity: 2,
//       },
//       {
//         accessory: "Replacement Earcups",
//         quantity: 3,
//       },
//       {
//         accessory: "user manual",
//         quantity: 1,
//       },
//     ],
//     product_posters: [
//       "/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg",
//       "/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg",
//       "/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg",
//     ],
//   },
// ];

// const recommendedProducts = [
//   {
//     productImage:
//       "/product-xx59-headphones/desktop/image-category-page-preview.jpg",
//     productName: "xx59",
//   },
//   {
//     productImage:
//       "/product-zx9-speaker/desktop/image-category-page-preview.jpg",
//     productName: "zx9",
//   },
//   {
//     productImage: "/product-xx99-mark-two-headphones/desktop/image-product.jpg",
//     productName: "xx99",
//   },
// ];

// const Product = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   return (
//     <div className="container">
//       <ArticleInfo
//         image={headphonesData[0].product_image}
//         name={headphonesData[0].product_name}
//         description={headphonesData[0].product_description}
//         price={headphonesData[0].price}
//         showCounterQuantity
//       />
//       <ArticleAccessories
//         content={headphonesData[0].product_content}
//         accessories={headphonesData[0].product_accessories}
//       />
//       <CardGroup posters={headphonesData[0].product_posters} />
//       <h3 style={{ textAlign: "center", marginTop: "160px" }}>
//         you may also like
//       </h3>
//       <div style={{ display: "flex", gap: "30px" }}>
//         {recommendedProducts.map((product: any, index: number) => {
//           return (
//             <ProductRecommendation
//               key={index}
//               productImage={product.productImage}
//               productName={product.productName}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Product;

interface Props {
  productData: any;
}

const Product = ({ productData }: Props) => {
  console.log(productData);
  return <div>Data:</div>;
};

export async function getStaticProps(params: any) {
  const productId = params.productId;
  const results = await fetch(
    // `https://last-airbender-api.herokuapp.com/api/v1/characters?name=${characterId}`
    `http://localhost:3001/product`
  ).then((res) => res.json());
  return {
    props: {
      character: results[0],
    },
  };
}

export async function getStaticPaths() {
  const products = await fetch("http://localhost:3001/product").then((res) =>
    res.json()
  );
  return {
    paths: products.rows.map((product: any) => {
      const productId = product.id;
      return {
        params: {
          productId,
        },
      };
    }),
    fallback: false,
  };
}

export default Product;
