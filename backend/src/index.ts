const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();

const app = express();
app.use(cors(corsOptions)); // Use this after the variable declaration
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

// SQL
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: process.env.DB_PASSWORD,
  database: "audiophile",
});

connection.connect((err: any) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

app.get("/", (req: any, res: any) => {
  connection.query("SELECT * from products", (err: any, rows: any) => {
    if (err) throw err;
    console.log("The data from products table are: \n", rows);
    res.json({ status: 200, data: rows });
  });
});
