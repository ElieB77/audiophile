const sql = require("../models/db");
const jwt = require("jsonwebtoken");

export const getUser = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `select name from users where user_id=${userId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ name: rows[0].name });
    }
  );
};
