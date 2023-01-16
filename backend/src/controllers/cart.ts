const sql = require("../models/db");
const jwt = require("jsonwebtoken");

export const getCart = (req: any, res: any) => {
  // const token = req.params.token;
  // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // const userId = decoded.id;

  sql.query(
    `SELECT Cart.item_id, Cart.quantity, products.name
    FROM Cart
    JOIN products ON Cart.item_id = products.item_id
    WHERE Cart.user_id = 28;`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ data: rows });
    }
  );
};

export const addToCart = (req: any, res: any) => {
  const { token, productId, quantity } = req.body;
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `select * from Cart where user_id=${userId} and item_id=${productId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      if (rows.length > 0) {
        sql.query(
          `UPDATE Cart SET quantity = quantity + 1 WHERE user_id = ${userId} AND item_id = ${productId}`,
          (err: any, rows: any) => {
            if (err) throw err;
            res.json({ message: "Item added to cart." });
          }
        );
      } else {
        sql.query(
          `SELECT * from Products WHERE item_id=${productId}`,
          (err: any, rows: any) => {
            if (err) throw err;
            if (rows.length > 0) {
              sql.query(
                `INSERT INTO Cart (user_id, item_id, quantity) VALUES (${userId}, ${productId}, ${quantity})`
              );
            }
          }
        );
      }
    }
  );
};

export const updateCartItemQuantity = (req: any, res: any) => {
  res.json({ message: "update item" });
};

export const removeFromCart = (req: any, res: any) => {
  const productId = req.params.product_id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `delete from Cart where user_id=${userId} and item_id=${productId}`,
    (err: any, rows: any) => {
      if (err) {
        throw err;
      } else {
        res.status(204).json({ message: "Item succesfully deleted." });
      }
    }
  );
};

export const getCartTotal = (req: any, res: any) => {
  res.json({ message: "Cart total" });
};

export const clearCart = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `delete from Cart where user_id=${userId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.status(204).json({ message: "Cart is clear.", data: rows });
    }
  );
};
