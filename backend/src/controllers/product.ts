const sql = require("../models/db");

export const getProducts = (req: any, res: any) => {
  sql.query("SELECT * from products", (err: any, rows: any) => {
    if (err) throw err;
    res.json({ status: 200, rows });
  });
};

export const getProductById = (req: any, res: any) => {
  const productId = req.params.id;
  sql.query(
    `SELECT * from products WHERE item_id=${productId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ status: 200, rows });
    }
  );
};

export const getProductByCategory = (req: any, res: any) => {
  const productCategory = req.params.category;
  console.log(productCategory);
  sql.query(
    `SELECT * from products WHERE category="${productCategory}"`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ status: 200, rows });
    }
  );
};
