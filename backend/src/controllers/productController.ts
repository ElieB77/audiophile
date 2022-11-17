const sql = require("../models/db");

module.exports = (req: any, res: any) => {
  sql.query("SELECT * from products", (err: any, rows: any) => {
    if (err) throw err;
    console.log("The data from products table are: \n", rows);
    res.json({ status: 200, data: rows });
  });
};
