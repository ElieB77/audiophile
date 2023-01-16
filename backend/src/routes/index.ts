const { Router } = require("express");

const home = require("../controllers/index");
const product = require("../controllers/product");
const user = require("../controllers/auth");
const cart = require("../controllers/cart");

const router = Router();

router.get("/", home);
router.get("/products", product.getProducts);
router.get("/product/:id", product.getProductById);
router.get("/category/:category", product.getProductByCategory);
router.post("/auth/signup", user.signUp);
router.post("/auth/signin", user.signIn);
router.get("/cart", cart.getCart);
router.post("/cart/add", cart.addToCart);
router.put("/cart/update/:id", cart.updateCartItemQuantity);
router.delete("/cart/remove/:product_id", cart.removeFromCart);
router.get("/cart/total", cart.getCartTotal);
router.delete("/cart/clear", cart.clearCart);

module.exports = router;
