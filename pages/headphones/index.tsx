import Navbar from "../../components/Navbar";
import ArticleInfo from "../../components/ArticleInfo";

const headphonesData = [
  {
    isNew: true,
    product_name: "zx9 speaker",
    product_description:
      "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    product_image:
      "/product-zx9-speaker/desktop/image-category-page-preview.jpg",
  },
  {
    isNew: false,
    product_name: "zx7 speaker",
    product_description:
      "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    product_image:
      "/product-zx7-speaker/desktop/image-category-page-preview.jpg",
  },
];

const Headphones = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        {headphonesData.map((article: any, index: number) => {
          return (
            <ArticleInfo
              key={index}
              name={article.product_name}
              image={article.product_image!}
              description={article.product_description}
              index={index}
              isNew={article.isNew}
            />
          );
        })}
      </div>
    </>
  );
};

export default Headphones;
