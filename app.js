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

//Route for ALL ARTICLES

app.route('/articles')

.get(function(req,res){
  Article.find()
  .then(function(err, foundArticles){
    if(!err){
    res.send(foundArticles);
    }else{
      res.send(err);
    }
  })
})

.post(function(req, res){

  const newArticle = new Article({
    title:req.body.title,
    content:req.body.content
  });

  newArticle.save()
  .then(function(err){
    if(!err){
      console.log("Successfully added new article");
    }else{
      res.send(err);
    }
  });
})

.delete(function(req, res){
  Article.deleteMany()
  .then(function(err){
    if(!err){
      res.send("Successfully deleted all articles")
    }else{
      res.send(err);
    };
  });
});


//Route for specific articles

app.route("/articles/:specificArticleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.specificArticleTitle })
      .then((contentReturned) => {
        res.send(contentReturned);
      })
      .catch((err) => {
        res.send(err);
      });
  });



app.listen(3000, function() {
    console.log("Server started on port 3000");
  });