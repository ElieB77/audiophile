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
              res.json({
                status: 201,
                rows,
                message: "Your account has been succesfully created !",
              });
            }
          );
        } else {
          res.json({ status: 400, message: "Email already exist" });
        }
      }
    );
  });
};

export const signIn = (req: any, res: any) => {
  const { email, password } = req.body;

  sql.query(
    `select * from users where email="${email}"`,
    (err: any, rows: any) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if (rows.length < 1) {
        return res
          .status(401)
          .json({ message: "Email or password is incorrect.", status: 401 });
      }

      bcrypt.compare(password, rows[0].password, (err: any, result: any) => {
        if (result) {
          return res.status(200).json({
            user: rows[0],
            message: "You are logged in !",
            status: 200,
          });
        } else {
          return res
            .status(401)
            .json({ message: "Email or password is incorrect", status: 401 });
        }
      });
    }
  );

  return;
};
