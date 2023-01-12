const sql = require("../models/db");

export const addToCart = (req: any, res: any) => {
  const { user_id, product_id } = req.body;

  sql.query(
    `INSERT INTO Cart (user_id, product_id)
      VALUES (${user_id}, "${product_id}")`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({
        status: 201,
        rows,
        message: "Products have been added to the cart",
      });
    }
  );
};

export const getCart = (req: any, res: any) => {
  // Get the user id
  // Retrieve cart items according to user id
  const { user_id } = req.body;

  sql.query(
    `SELECT * from Cart WHERE user_id = ${user_id} `,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ status: 200, rows });
    }
  );
};
