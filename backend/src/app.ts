const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app: any = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
