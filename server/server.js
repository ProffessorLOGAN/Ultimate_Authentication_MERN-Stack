const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// coonect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // usefindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("DB DATABASE ERROR :", err));

// import routes
const authRoutes = require("./routes/auth");

// app middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = "developement")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

//middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`API is running on ${port}`);
});
