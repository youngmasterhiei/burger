var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");



  

  app.get("/", function(req, res) {
    connection.query("SELECT * FROM plans;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.render("index", { plans: data });
    });
  });
  
  app.post("/todos", function(req, res) {
    connection.query("INSERT INTO plans (plan) VALUES (?)", [req.body.plan], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
  
      // Send back the ID of the new todo
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    });
  });
  

  app.get("/todos", function(req, res) {
    connection.query("SELECT * FROM plans;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.json(data);
    });
  });
  

  app.put("/todos/:id", function(req, res) {
    connection.query("UPDATE plans SET plan = ? WHERE id = ?", [req.body.plan, req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });
  
