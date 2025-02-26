const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require('cookie-parser');

const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");
const url = require("./models/url");
const {restrictUnauthenticated} =require("./middlewares")

const app = express();
const PORT = 8001;

//setting the view engine
app.set("view engine", "ejs");

//provide the path to the static files
app.set("views", path.resolve(__dirname, "views"));

//connect to the database
mongoose
  .connect("mongodb://localhost:27017/url-shortner")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Mongo Error: ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.get("/home",restrictUnauthenticated, async (req, res) => {
  const id=req.user.id;
  const urls = await url.find({createdBy:id});
  return res.render("home", { Urls: urls });

});

app.get("/signup", (req, res) => {
  return res.render("signup");
});

app.get("/signin", (req, res) => {
  return res.render("signin",{error:''});
});

app.use("/api", userRouter);

app.use("/",restrictUnauthenticated, urlRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
