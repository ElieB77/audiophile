import styles from "./styles.module.scss";

interface Props {
  content?: string;
  accessories?: {
    quantity: number;
    accessory: string;
  }[];
}

const ArticleAccessories = ({ content, accessories }: Props) => {
  return (
    <div className={styles.__article_accessories}>
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
              <p>{item.accessory}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticleAccessories;
