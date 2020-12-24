var express = require('express');
var app = express();
const connectDB = require("./config/connectDB");



//parse the data to json 
app.use(express.json());

/*start the crud*/
//Create Your Schema
const User = require("./models/User");

//add new user
//PATH : /api/add_user
app.post("/api/add_user", (req, res) => {
  const { last_name, first_name, email, age } = req.body;
  const newUser = new User({ last_name, first_name, email, age }); // create a new document
  newUser
    .save()
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({ msg: "ERROR ADD",err }));
});

//GET ALL USERS
// PATH : /api/users

app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => res.send({msg:"Contact list", users}))
    .catch((err) => res.send(err));
});


//GET USER BY ID
//PATH : /api/users/:userID
app.get("/api/users/:userID", (req, res) => {
  const id = req.params.userID;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User Not Found " });
      }
      res.send(user);
    })
    .catch((err) => res.status(400).send({ msg: "ERROR GET USER BY ID" }));
});

//UPDATE USER BY ID
//PATH : /api/users/:userID
app.put("/api/users/:userID", (req, res) => {
  const userID = req.params.userID;
  User.findByIdAndUpdate(userID, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User Not Found " });
      }
      res.send(user);
    })
    .catch((err) => res.status(400).send({ msg: "ERROR" }));
});

//DELETE USER BY ID
//PATH : /api/users/:userID
app.delete("/api/users/:userID", (req, res) => {
  const id = req.params.userID;
  User.findByIdAndDelete(id) 
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User Not Found " });
      }
      res.send({msg:"user is deleted",user});
    })
    .catch((err) => res.status(400).send({ msg: "Error Remove user " }));
});


/*end the crud*/



// setup  env variables
require("dotenv").config({ path: "./config/.env" });
console.log(process.env.MONGO_URL)
//connect the data base
connectDB();

//start server 
const port = 5000 ;

app.listen(port, () => {
  console.log(`The Server is Running on port : http://http://localhost:${port}....`);
});