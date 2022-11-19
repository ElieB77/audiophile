const { Router } = require("express");

const home = require("../controllers/index");
const product = require("../controllers/product");

const router = Router();

router.get("/", home);
router.get("/products", product.getProducts);
router.get("/product/:id", product.getProductById);

module.exports = router;
