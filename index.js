const express = require("express");
const Product = require("./models/ProductModel");
const User = require("./models/UserModel");
const Cart = require("./models/CartModel");
const dotenv = require("dotenv");
const connectDB = require("./dbConnection");
var path = require("path");
const app = express();

dotenv.config();
connectDB();
const PREFIX = "/api";

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   // res.sendFile(path.join(__dirname + "/client/build/index.html"));
//   res.sendFile(path.join(__dirname, "a.html"));
// });

app.get("/api/test", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.get(`${PREFIX}/products`, async (req, res) => {
  const products = await Product.find({});

  console.log("products :", products);
  res.send(products);
});

//get all prodcuts in specific category
app.get(`${PREFIX}/products/:category`, async (req, res) => {
  console.log(req.params.category);
  let products = await Product.find({ category: req.params.category });
  console.log(products);

  res.status(200).send(products);
});

//create new product

app.post(`${PREFIX}/newProduct`, async (req, res) => {
  console.log(req.body.newProduct);
  const product = await Product.create(req.body.newProduct);

  product.save();
  const products = await Product.find({});
  res.send(products);
});

//update product

app.put(`${PREFIX}/updateproduct`, async (req, res) => {
  try {
    await Product.deleteMany();
    Product.insertMany(req.body.products);

    console.log("BODY: ", req.body.products);
    console.log("products have been updated succsesfully");

    res.send(req.body);
  } catch {
    res.status(500).send("update product failed");
  }
});

//delete product

app.delete(`${PREFIX}/removeproduct/:id`, async (req, res) => {
  try {
    console.log(req.params);
    await Product.findOneAndDelete({ _id: req.params.id });
    console.log("product removed !");
    const products = await Product.find();
    res.send(products);
  } catch {
    console.log("error occured while deleting product");
  }
});

//create user

app.post(`${PREFIX}/signin`, async (req, res) => {
  console.log("new user", req.body);
  await User.create(req.body);
  const users = await User.find({});

  res.send(users);
});

//log in , check if an admin logged in if he does send to client that he did to enable admin funcions on client side

app.post(`${PREFIX}/login`, async (req, res) => {
  console.log(req.body);
  const user = await User.find({});
  // const users = await User.find({});
  // console.log(user);
  // console.log(user._id);
  // const cart = await Cart.findOne({ userID: user._id });

  // if (user && user.isAdmin === true) {
  //   res.send({
  //     loginSucces: true,
  //     isAdmin: true,
  //     userData: {
  //       username: user.username,
  //       email: user.email,
  //       address: user.address,
  //     },
  //     cart: car,
  //     users: users,
  //   });
  // } else if (user && user.isAdmin === false) {
  //   res.send({
  //     loginSucces: true,
  //     isAdmin: false,
  //     userData: {
  //       username: user.username,
  //       email: user.email,
  //       address: user.address,
  //     },
  //     cart: cart,
  //     users: users,
  //   });
  // } else {
  //   res.send({ loginSucces: false, isAdmin: false, users: users });
  // }
  res.send(user);
});

//update user
app.post(`${PREFIX}/updateuser`, async (req, res) => {
  console.log(req.body);
  const user = await User.findOneAndUpdate(
    { username: req.body.userData.username },
    {
      username: req.body.userData.username,
      email: req.body.userData.email,
      address: req.body.userData.address,
    },
    {
      new: true,
    }
  );
  console.log("updated user:", user);
  res.send("ok");
});

//set cart

app.post(`${PREFIX}/setcart`, async (req, res) => {
  console.log(req.body);
  console.log(req.body.username);
  const user = await User.find({ username: req.body.username });
  const userID = user[0]._id;
  const cart = await Cart.find({ userID: userID });
  console.log("cart :", cart);
  if (cart.length === 0) {
    const cart = await Cart.create({
      userID: userID,
      cartItems: req.body.cartItems,
    });
    cart.save();
  } else {
    await Cart.findOneAndUpdate(
      { userID: userID },
      { cartItems: req.body.cartItems }
    );
  }

  const updatedCart = await Cart.find({ userID: userID });

  res.send(updatedCart[0]);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
