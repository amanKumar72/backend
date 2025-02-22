const express = require("express");
const PORT = 8000;
const app = express();

// require route,connection for mongodb and log middleware
const userRouter = require("./routes/users");
const mongoDB = require("./config/mongoDb");
const {logReqRes} = require("./middlewares/index");


//middleware for parsing the body of the request object and storing it in the req.body property
//middleware for logging the request and response
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"))


// forwarding all requests to the user router
app.use("/api/users", userRouter);


// connect mongodb to the application with db name practice
mongoDB
  .connectDB("mongodb://127.0.0.1:27017/practice")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("MOngo Error: ", err));


  
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
