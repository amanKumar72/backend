const express = require("express");
const mongoose = require("mongoose");
const urlRouter=require("./routes/url")

const app = express();
const PORT = 8001;

mongoose
  .connect("mongodb://localhost:27017/url-shortner")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Mongo Error: ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", urlRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
