const { Router } = require("express");

const home = require("../controllers/homeController");
const product = require("../controllers/productController");

const router = Router();

router.get("/", home);
router.get("/product", product);

module.exports = router;
