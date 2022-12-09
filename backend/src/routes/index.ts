const { Router } = require("express");

const home = require("../controllers/index");
const product = require("../controllers/product");
const user = require("../controllers/user");

const router = Router();

router.get("/", home);
router.get("/products", product.getProducts);
router.get("/product/:id", product.getProductById);
router.get("/category/:category", product.getProductByCategory);
router.post("/register", user.registerUser);

module.exports = router;
