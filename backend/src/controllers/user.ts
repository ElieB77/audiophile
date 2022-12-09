const sql = require("../models/db");

export const registerUser = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  sql.query(
    `select * from users where email="${email}"`,
    (err: any, rows: any) => {
      if (err) throw err;
      if (rows.length < 1) {
        sql.query(
          `INSERT INTO Users (name, email, password)
            VALUES (
                "${name}",
                "${email}",
                "${password}"
            )`,
          (err: any, rows: any) => {
            if (err) throw err;
            res.json({ status: 200, rows });
          }
        );
      } else {
        res.json({ status: 400, message: "User already exist" });
      }
    }
  );
};
