const express = require('express');
const app = express();
const mongoose = require("mongoose");

const dotenv = require('dotenv');

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");



const auth = require("./routes/auth");

const cors = require("cors");

dotenv.config();

const stripeRoute = require("./routes/stripe");
mongoose.connect(
    process.env.MONGO_URL
)
.then(()=>console.log("DBConnection Success"))
.catch((err)=>{
    console.log(err)
})
;

app.use(cors());
app.use(express.json());
app.use("/api/user",userRoute);
app.use("/api/product",productRoute);
app.use("/api/order",orderRoute);
app.use("/api/cart",cartRoute);
app.use("/api/auth", auth);
app.use("/api/checkout", stripeRoute);


app.listen(process.env.PORT || 5000,()=>{
    console.log("background server is running")
});