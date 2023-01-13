const sql = require("../models/db");
const jwt = require("jsonwebtoken");

export const addToCart = (req: any, res: any) => {
  const { products, token } = req.body;
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userEmail = decoded.name;

  sql.query(
    `select * from Cart where email="${userEmail}"`,
    (err: any, rows: any) => {
      if (err) throw err;
      if (rows.length < 1) {
        sql.query(
          `INSERT INTO Cart (email, products) VALUES ("${userEmail}","${products}")`
        );
        res.json({ message: "New user" });
      } else {
        sql.query(
          `update Cart set products="${[products]}" where email="${userEmail}"`
        );
        res.json({ message: "Cart has been updated" });
      }
    }
  );
};
