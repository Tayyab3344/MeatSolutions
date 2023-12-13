const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");
const userRoutes = require("./routes/user");

const FormDataModel = require("./models/FormDataModel");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Math.floor(Math.random() * 90000) + 10000 + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else cb(null, false);
};

const app = express();

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

//set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", upload.array("images", 10), authRoutes);
app.use("/seller", upload.single("image"), itemRoutes);
app.use(userRoutes);

//......................hire me payment method..........
const stripe = require("stripe")(
  "sk_test_51O1iJEIUiAXCZO9s86ttYxC0LEiIMpMMGJI03j89Jv8ql1CyhTJHiTHtzVo54s1z4rWCZjGsTOJ73e3ZkrmuNQSm00i4cyQBdK"
);

// Create Mongoose models
const Order = mongoose.model("Hiring Payments", {
  creatorName: String, // Creator name
  email: String,
  price: Number,
});

const handlePayment = async (req, res) => {
  try {
    const { id, amount, orders } = req.body;
    console.log(req.body);

    // Parse orders array from JSON string
    const parsedOrders = JSON.parse(orders);

    if (
      !parsedOrders ||
      !Array.isArray(parsedOrders) || // Check if it's an array
      parsedOrders.length === 0 ||
      parsedOrders.some(
        (order) =>
          !order.productName || // Change to productName
          !order.email ||
          !order.creatorPrice // Change to creatorPrice
      )
    ) {
      return res.status(400).json({ message: "Missing or invalid orders" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "pkr",
      description: "Orders Payment",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token: id,
        },
      },
      confirm: true,
    });

    console.log(paymentIntent);

    // Save order details to the database using the Order model
    const orderDocs = await Order.create(parsedOrders);

    // Remove ordered products from the database by creator name using the Product model
    // const creatorNames = parsedOrders.map(order => order.productName);
    // await Product.deleteMany({ name: { $in: creatorNames } });

    res.json({ message: "Payment successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Payment failed" });
  }
};

app.post("/api/payment", handlePayment);

//error middleware
app.use((error, req, res, next) => {
  console.log(error + "--------------------------");
  const statusCode = error.statusCode || 500;
  const message = error.message;
  let errorsPresent;
  if (error.errors) {
    errorsPresent = error.errors;
  }

  res.status(statusCode).json({
    message: message,
    errors: errorsPresent,
  });
});

const clients = {};

mongoose
  .connect(
    "mongodb+srv://rizwan:rizwan123@cluster0.3lrinwh.mongodb.net/meatsol?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("Connected to db");
    const server = app.listen(process.env.PORT || 3002);
    const io = require("./util/socket").init(server);
    io.on("connection", (socket) => {
      socket.on("add-user", (data) => {
        clients[data.userId] = {
          socket: socket.id,
        };
      });

      //Removing the socket on disconnect
      socket.on("disconnect", () => {
        for (const userId in clients) {
          if (clients[userId].socket === socket.id) {
            delete clients[userId];
            break;
          }
        }
      });
    });
  })
  .catch((err) => console.log(err));

app.post("/api/form-submit", async (req, res) => {
  try {
    const formData = req.body;

    // Create a new instance of the FormDataModel
    const formDataInstance = new FormDataModel(formData);

    // Save the form data to MongoDB
    await formDataInstance.save();

    console.log("Form data inserted into MongoDB:", formData);

    res
      .status(200)
      .json({ message: "Form data received and stored successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/forget-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await FormDataModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token (in a real-world scenario, you would typically send an email with this token)
    const resetToken = generateResetToken();

    // Update the user's document in the database with the reset token
    await FormDataModel.updateOne({ email }, { $set: { resetToken } });

    // In this example, we're sending the reset token in the API response (for demo purposes)
    res
      .status(200)
      .json({ message: "Reset Password Link sent to your Email", resetToken });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.clients = clients;
