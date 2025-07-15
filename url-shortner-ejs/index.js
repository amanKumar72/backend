require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const shortid = require("shortid");
const {
  generateNewShortUrl,
  handleRedirectToOriginalUrl,
  getUrlAnylatics,
} = require("./controllers/url")

// const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");
const url = require("./models/url");
const {restrictUnauthenticated} =require("./middlewares")
const cookieParser=require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 8001;

// console.log=(){}

//setting the view engine
app.set("view engine", "ejs");

//provide the path to the static files
app.set("views", path.resolve(__dirname, "views"));
//connect to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Mongo Error: ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get(['/', '/home'],restrictUnauthenticated, async (req, res) => {
  console.log(req.cookies)
  const id=req.cookies.id;
  const urls = await url.find({createdBy:id});
  console.log(urls)
  return res.render("home", { Urls: urls,baseURL:process.env.BASE_URL });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("id");
  res.redirect("/signin");
});

app.get("/signup", (req, res) => {
  return res.render("signup");
});

app.get("/signin", (req, res) => {
  return res.render("signin",{error:''});
});

app.use("/api/user", userRouter);

app.post("/url", generateNewShortUrl);

app.get("/:id", handleRedirectToOriginalUrl);

app.get("/analytics/:id", getUrlAnylatics);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
