import Hero from "../components/Layout/Hero";
import CardCategories from "../components/Card/CardCategories";
import CardGroup from "../components/Card/CardGroup";
// import headphonesThumbnail from "../public/static/shared/desktop/image-category-thumbnail-headphones.png";
import headphonesThumbnail from "/shared/desktop/image-category-thumbnail-headphones.png";
import speakersThumbnail from "/shared/desktop/image-category-thumbnail-speakers.png";
import earphonesThumbnail from "/shared/desktop/image-category-thumbnail-earphones.png";

const cardCategoryData = [
  {
    imageUrl: headphonesThumbnail,
    categoryName: "headphones",
    categoryHref: "/category/headphones",
    width: 200,
    height: 200,
  },
  {
    imageUrl: speakersThumbnail,
    categoryName: "speakers",
    categoryHref: "/category/speakers",
    width: 200,
    height: 200,
  },
  {
    imageUrl: earphonesThumbnail,
    categoryName: "earphones",
    categoryHref: "/category/earphones",
    width: 200,
    height: 200,
  },
];

export default function Home() {
  return (
    <>
      <Hero
        heroOverline="new product"
        heroTitle="XX99 Mark II Headphones"
        heroParagraph=" Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast."
        productId="4"
      />
      <div className="container">
        <div className="__card_categories">
          {cardCategoryData.map((card: any, index: number) => {
            return (
              <CardCategories
                key={index}
                categoryName={card.categoryName}
                categoryImage={card.imageUrl!}
                categoryHref={card.categoryHref}
                width={card.width}
                height={card.height}
                btnContent={"SHOP"}
              />
            );
          })}
        </div>

        <CardGroup
          firstBlockTitle="zx9 speaker"
          firstBlockParagraph="Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound."
          firstBlockProductId="6"
          secondBlockTitle="zx7 speaker"
          secondBlockProductId="5"
          thirdBlockTitle="yx1 earphone"
          thirdBlockProductId="1"
        />
      </div>
    </>
  );
}
