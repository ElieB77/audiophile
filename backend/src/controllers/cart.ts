const sql = require("../models/db");
const jwt = require("jsonwebtoken");

export const getCart = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `SELECT Cart.item_id, Cart.quantity, products.short_name, products.price, products.cart_image
    FROM Cart
    JOIN products ON Cart.item_id = products.item_id
    WHERE Cart.user_id = ${userId};`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ data: rows });
    }
  );
};

export const addToCart = (req: any, res: any) => {
  const { item_id, quantity } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `select * from Cart where user_id=${userId} and item_id=${item_id}`,
    (err: any, rows: any) => {
      if (err) throw err;
      if (rows.length > 0) {
        sql.query(
          `UPDATE Cart SET quantity = quantity + ${quantity} WHERE user_id = ${userId} AND item_id = ${item_id}`,
          (err: any, rows: any) => {
            if (err) throw err;
            res.json({ message: "Item added to cart." });
          }
        );
      } else {
        sql.query(
          `SELECT * from Products WHERE item_id=${item_id}`,
          (err: any, rows: any) => {
            if (err) throw err;
            if (rows.length > 0) {
              sql.query(
                `INSERT INTO Cart (user_id, item_id, quantity) VALUES (${userId}, ${item_id}, ${quantity})`
              );
            }
          }
        );
      }
    }
  );
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

export const increaseItemQuantity = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;
  const { item_id } = req.body;

  sql.query(
    `update cart set quantity = quantity + 1 where user_id=${userId} and item_id=${item_id}`,
    (err: any, rows: any) => {
      if (err) throw err;
      return res.status(200).json({ message: "Quantity updated.", data: rows });
    }
  );
};

export const decreaseItemQuantity = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;
  const { item_id } = req.body;

  sql.query(
    `update cart set quantity = quantity - 1 where user_id=${userId} and item_id=${item_id}`,
    (err: any, rows: any) => {
      if (err) throw err;
      return res.status(200).json({ message: "Quantity updated.", data: rows });
    }
  );
};

export const getCartTotal = (req: any, res: any) => {
  // Get user id to find cart specific to user
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `SELECT Cart.item_id, Cart.quantity, products.price
    FROM Cart
    JOIN products ON Cart.item_id = products.item_id
    WHERE Cart.user_id = ${userId};`,
    (err: any, rows: any) => {
      if (err) throw err;
      if (rows.length > 0) {
        const cartTotalPrice = rows.reduce(
          (accumulator: number, current: { price: number; quantity: number }) =>
            accumulator + current.price * current.quantity,
          0
        );
        res.json({ total: cartTotalPrice });
      } else {
        res.status(400);
      }
      res.status(200);
    }
  );
};
