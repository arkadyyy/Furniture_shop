const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./dbConnection");
const Product = require("./models/ProductModel");
const User = require("./models/UserModel");
const Cart = require("./models/CartModel");
const products = require("./data/products");
const users = require("./data/users");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
dotenv.config();

const PREFIX = "/api";
// app.use("/", express.static(path.join(__dirname, "/src")));
// app.use("/", express.static(path.join(build)));

connectDB();
// Product.insertMany(products);
// console.log(products);
//socket.io config

const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get(`${PREFIX}/products`, async (req, res) => {
  const products = await Product.find({});
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
    io.emit("products_updated");
    res.send(req.body);
  } catch {
    res.status(500).send("update product failed");
  }
});

// products purchase

app.put(`${PREFIX}/purchase`, async (req, res) => {
  console.log("product purchase click : ", req.body);
  req.body.cartItems.forEach(async (product) => {
    console.log(product.quantity);
    console.log(product.product.countInStock);
    if (product.product.countInStock - product.quantity >= 0) {
      await Product.findOneAndUpdate(
        { name: product.product.name },
        {
          countInStock: product.product.countInStock - product.quantity,
        },
        {
          new: true,
        }
      );
      // let user = await User.findOne({ username: req.body.username });
      // console.log(user);
      // await Cart.findOneAndDelete({ userID: user._id }, function (err, docs) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("Deleted cart : ", docs);
      //   }
      // });
    } else {
      res.send({ purchaseSuccess: false, productName: product.product.name });
    }
  });
  io.emit("products_updated");
  res.send(true);
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

// app.delete("/deleteProduct", async (req, res) => {
//   const product = Product.findOneAndDelete({});
//   product.save();
// });

/////////////////////////

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
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(user);
  console.log(user._id);

  const cart = await Cart.findOne({ userID: user._id });
  console.log("i have found this cart for logged", cart);
  if (user && user.isAdmin === true) {
    res.send({
      loginSucces: true,
      isAdmin: true,
      userData: {
        username: user.username,
        email: user.email,
        address: user.address,
      },
      cart: cart,
    });
  } else if (user && user.isAdmin === false) {
    res.send({
      loginSucces: true,
      isAdmin: false,
      userData: {
        username: user.username,
        email: user.email,
        address: user.address,
      },
      cart: cart,
    });
  } else {
    res.send({ loginSucces: false, isAdmin: false });
  }
  io.sockets.emit("login", "login just happend !");
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
  // user.email = req.body.email;
  // user.adress = req.body.adress;
  // user.save();
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

  // console.log(user[0]._id);
  // req.body.cartItems.map((item) => console.log(item));
  res.send(updatedCart[0]);
});

server.listen(process.env.PORT || 7000, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
