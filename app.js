const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const models = require("./db/models");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Setting up routes
app.route("/id")
  .get((req, res) => {
    res.send({uuid: uuidv4()})
});        

app.route("/user")
  .get((req, res) => {
    models.User.find((err, users) =>{
        if (!err){
            res.status(201).send(users);
        } else {
            res.status(400).send(err);
        }
    })
  })
  .post((req, res) => {
    const newUser = new models.User({
        _id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        nationality: req.body.nationality
    });

    newUser.save(err => {
        if (!err){
            res.status(201).send("Success: added " + req.body.name + " to db");

        } else {
            res.status(400).send(err);
        }
    })
  });

exports.app = app;
