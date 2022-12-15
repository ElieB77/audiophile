const sql = require("../models/db");
const bcrypt = require("bcrypt");

export const signUp = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash: any) => {
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
                  "${hash}"
              )`,
            (err: any, rows: any) => {
              if (err) throw err;
              res.json({ status: 200, rows });
            }
          );
        } else {
          res.json({ status: 400, message: "Email already exist" });
        }
      }
    );
  });
};

export const signIn = () => {};
