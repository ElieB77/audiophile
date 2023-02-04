![Headphones](public/static/home/desktop/image-hero.jpg)

<h2 align="center">AUDIOPHILE</h2>

Links to [Backend repository](https://github.com/ElieB77/audiophile_backend) & [Live website](https://audiophile-elieb77.vercel.app/)


## Introduction
This is my solution to the Audiophile e-commerce website challenge created by [Frontend Mentor](https://www.frontendmentor.io/home)

---

## Features
The website includes the following features :
- Autentication
- Shopping cart
- Payment processing
- Product catalog
- Responsive design

---

## Stack & Technologies used
This project was built using the following technologies :
- React
- Next
- Typescript
- Sass

#### Dependencies
- [react](https://www.npmjs.com/package/react)
- [react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js)
- [react-confetti](https://www.npmjs.com/package/react-confetti)
- [react-toastify](https://www.npmjs.com/package/react-toastify)
- [@types-react](https://www.npmjs.com/package/@types/react)
- [sass](https://www.npmjs.com/package/sass)
- [typescript](https://www.npmjs.com/package/typescript)


---

## Getting started
1. Clone the repository
 ```bash
git clone https://github.com/ElieB77/audiophile.git
```

2. Run npm install
 ```bash
npm install
```

3. Create a .env file and add the following environment variables
```bash
NEXT_PUBLIC_SIGNUP_URL= {YOUR_URL}/auth/signup
NEXT_PUBLIC_SIGNIN_URL= {YOUR_URL}/auth/signin
NEXT_PUBLIC_PRODUCTS_URL= {YOUR_URL}/products
NEXT_PUBLIC_PRODUCT_URL= {YOUR_URL}/product
NEXT_PUBLIC_CATEGORY_URL= {YOUR_URL}/category
NEXT_PUBLIC_ADD_TO_CART= {YOUR_URL}/cart/add
NEXT_PUBLIC_GET_CART= {YOUR_URL}/cart
NEXT_PUBLIC_REMOVE_ITEM= {YOUR_URL}/remove
NEXT_PUBLIC_CLEAR_CART= {YOUR_URL}/cart/clear
NEXT_PUBLIC_GET_USER= {YOUR_URL}/user
NEXT_PUBLIC_STRIPE_SECRET_KEY= XXXXXXXXX -> (https://stripe.com/docs/keys) 
NEXT_PUBLIC_STRIPE_URL= {YOUR_URL}/create-payment-intent
```

4. In your nodeJS app, add the following functions :
<details><summary><b>Authentication</b></summary>

 ```javascript
 // app.post('/auth/signup')
export const signUp = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash: any) => {
    sql.query(
      `select * from users where email="${email}"`,
      (err: any, rows: any) => {
        if (err) throw err;
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO users (name, email, password)
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
          res.json({ status: 400, message: "This email already exist." });
        }
      }
    );
  });
};
```

```javascript
 // app.post('/auth/signin')
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
          const token = jsonwebtoken.sign(
            { id: rows[0].user_id },
            process.env.ACCESS_TOKEN_SECRET,
            { algorithm: "HS256" }
          );
          return res.status(200).json({
            message: "You are logged in !",
            status: 200,
            token: token,
          });
        } else {
          return res
            .status(401)
            .json({ message: "Email or password is incorrect.", status: 401 });
        }
      });
    }
  );
};
```
</details>
<details><summary><b>Products</b></summary>

```javascript
 // app.get('/products')
export const getProducts = (req: any, res: any) => {
  sql.query("SELECT * from products", (err: any, rows: any) => {
    if (err) throw err;
    res.json({ status: 200, rows });
  });
};
```

```javascript
 // app.get('/product/:id')
export const getProductById = (req: any, res: any) => {
  const productId = req.params.id;
  sql.query(
    `SELECT * from products WHERE item_id=${productId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ status: 200, rows });
    }
  );
};
```

```javascript
// app.get('/product/:category')
export const getProductByCategory = (req: any, res: any) => {
  const productCategory = req.params.category;
  console.log(productCategory);
  sql.query(
    `SELECT * from products WHERE category="${productCategory}"`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ status: 200, rows });
    }
  );
};
```
</details>

<details><summary><b>Cart</b></summary>

```javascript
// app.post('/cart/add')
export const addToCart = (req: any, res: any) => {
  const { items } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;
  console.log(userId);

  items.map((item: any) => {
    sql.query(
      `select * from Cart where user_id=${userId} and id=${item.id}`,
      (err: any, rows: any) => {
        if (err) throw err;
        if (rows.length < 1) {
          sql.query(
            `INSERT INTO Cart (user_id, id, quantity, name, price, image) VALUES (${userId}, ${item.id}, ${item.quantity}, "${item.name}", ${item.price}, "${item.image}")`
          );
        } else {
          sql.query(
            `update Cart set quantity = ${item.quantity} where id=${item.id} and user_id=${userId}`
          );
        }
      }
    );
  });

  res.json({ cartItems: items });
};
```

```javascript
// app.get('/cart')
export const getCart = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `select * from Cart where user_id=${userId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ cartItems: rows });
    }
  );
};
```

```javascript
// app.delete('/remove/:id')
export const removeFromCart = (req: any, res: any) => {
  const productId = req.params.product_id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `delete from Cart where user_id=${userId} and id=${productId}`,
    (err: any, rows: any) => {
      if (err) {
        throw err;
      } else {
        res.status(204).json({ message: "Item succesfully deleted." });
      }
    }
  );
};
```

```javascript
// app.delete('/cart/clear')
export const clearCart = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `delete from Cart where user_id=${userId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.status(204).json({ message: "Cart is clear.", data: rows });
    }
  );
};
```
</details>
<details><summary><b>Users</b></summary>

```javascript
export const getUser = (req: any, res: any) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decoded.id;

  sql.query(
    `select name from users where user_id=${userId}`,
    (err: any, rows: any) => {
      if (err) throw err;
      res.json({ name: rows[0].name });
    }
  );
};
```
</details>
<details><summary><b>Stripe</b></summary>

```javascript
export const createPaymentIntent = async (req: any, res: any) => {
  const { cartItems } = req.body;

  const orderAmount = cartItems.reduce(
    (accumulator: number, current: { price: number; quantity: number }) =>
      accumulator + current.price * current.quantity,
    0
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
```

</details>

5. Then in your MySQL database, add the following tables

```mysql
CREATE TABLE `Cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
)
```

```mysql
CREATE TABLE `products` (
  `item_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL,
  `features` text,
  `description` varchar(300) DEFAULT NULL,
  `images` json DEFAULT NULL,
  `includes` json DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `category_image` json DEFAULT NULL,
  `cart_image` varchar(255) DEFAULT NULL,
  `short_name` varchar(255) DEFAULT NULL
)
```

```mysql
CREATE TABLE `users` (
  `name` varchar(150) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` char(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL
)
```














