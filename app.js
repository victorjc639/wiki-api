const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.static("public"));
  
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);
//TODO
 



app.listen(3000, function() {
    console.log("Server started on port 3000");
  });