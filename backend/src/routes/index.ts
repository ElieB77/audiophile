const { Router } = require("express");

const home = require("../controllers/index");
const product = require("../controllers/product");
const auth = require("../controllers/auth");
const cart = require("../controllers/cart");
const user = require("../controllers/user");

const router = Router();

router.get("/", home);
router.get("/products", product.getProducts);
router.get("/product/:id", product.getProductById);
router.get("/category/:category", product.getProductByCategory);
router.post("/auth/signup", auth.signUp);
router.post("/auth/signin", auth.signIn);
router.get("/cart", cart.getCart);
router.post("/cart/add", cart.addToCart);
router.put("/cart/update/:id", cart.updateCartItemQuantity);
router.delete("/cart/remove/:product_id", cart.removeFromCart);
router.get("/cart/total", cart.getCartTotal);
router.delete("/cart/clear", cart.clearCart);
router.get("/user", user.getUser);

module.exports = router;
