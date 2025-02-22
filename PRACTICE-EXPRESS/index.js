const express = require("express");
let users = require("./users.json");
const fs = require("fs");
const PORT=8000

const app = express();

//middleware for parsing the body of the request object
app.use(express.urlencoded({ extended: false }));

// Middleware to find user by ID
const findUserById = (req, res, next) => {
  req.user = users.find((user) => user.id === parseInt(req.params.id));
  if (!req.user) return res.status(404).send("User not available");
  next();
};

const mandatoryFields = (req, res, next) => {
  if (!req.body.first_name || !req.body.last_name|| !req.body.mobile_number|| !req.body.email || !req.body.gender) {
    return res.status(400).send("all fields are mandatory");
  }
  next();
};



//route which returns the html page
app.route("/users").get((req, res) => {
  return res.send(`<ul>
            ${users.map((user) => `<li>${user.first_name}</li>`)}
        </ul>`);
});

//Rest api which returns json
app
  .route("/api/users")
  .get((req, res) => {
    return res.json(users);
  })
  .post(mandatoryFields,(req, res) => {
    const data = { ...req.body, id: users.length + 1 };
    users.push(data);
    fs.writeFile("./users.json", JSON.stringify(users), (err) => {});
    return res.status(201).json(users);
  });

//dynamic route which returns json

// Route handlers
app
  .route("/api/users/:id")
  .get(findUserById, (req, res) => {
    res.json(req.user);
  })
  .patch(findUserById, mandatoryFields, (req, res) => {
    users = users.map((user) =>
      user.id === parseInt(req.params.id) ? { ...req.body, id: user.id } : user
    );
    fs.writeFile("./users.json", JSON.stringify(users), (err) => {});
    res.status(200).send(`User with id ${req.params.id} updated`);
  })
  .delete(findUserById, (req, res) => {
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    fs.writeFile("./users.json", JSON.stringify(users), (err) => {});
    res.status(204).send(`User with id ${req.params.id} deleted`);
  });

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
