const express = require("express");
const mongoose = require("mongoose");
const urlRouter=require("./routes/url")
const path=require('path');
const url = require("./models/url");

const app = express();
const PORT = 8001;

//setting the view engine
app.set('view engine','ejs')

//provide the path to the static files
app.set('views',path.resolve(__dirname,'views'))

//connect to the database
mongoose
  .connect("mongodb://localhost:27017/url-shortner")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Mongo Error: ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get("/home",async (req, res) => {
  const urls=await url.find({});
  
  return res.render("home",{Urls:urls});
});

app.use("/", urlRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
