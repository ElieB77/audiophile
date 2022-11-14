import { useRouter } from "next/router";
import ArticleInfo from "../../components/ArticleInfo";

const headphonesData = [
  {
    isNew: true,
    product_name: "zx9 speaker",
    product_description:
      "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    product_image:
      "/product-zx9-speaker/desktop/image-category-page-preview.jpg",
    price: 1750,
  },
];

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="container">
      <ArticleInfo
        image={headphonesData[0].product_image}
        name={headphonesData[0].product_name}
        description={headphonesData[0].product_description}
        price={headphonesData[0].price}
        showCounterQuantity
      />
    </div>
  );
};

export default Product;
