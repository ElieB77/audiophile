import styles from "./styles.module.scss";

interface ProductAccessoriesProps {
  content?: string;
  accessories?: {
    quantity: number;
    accessory: string;
  }[];
}

const ProductAccessories = ({
  content,
  accessories,
}: ProductAccessoriesProps) => {
  return (
    <div className={styles.__product_accessories}>
      <div className={styles.__left_block}>
        <h3>features</h3>
        <p>{content}</p>
      </div>
      <div className={styles.__right_block}>
        <h3>in the box</h3>
        {accessories?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <span>{item.quantity}x</span>
              <p>{item.item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductAccessories;
