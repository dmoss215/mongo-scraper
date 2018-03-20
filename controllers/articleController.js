var request = require("request");
var cheerio = require("cheerio");
var express = require("express");
// Requiring our Comment and Article models
var Comment = require("../models/comment.js");
var Article = require("../models/article.js");

module.exports = function (app) {

app.get("/", function (req, res) {
    // Get all articles from articles table in mongodb
    Article.find({}, function (err, doc) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(doc);
            res.render("index", {result: doc});
        }
    }).sort({'_id': -1});
})

app.get("/scrape", function (req, res) {
    // Make a request call to grab the HTML body from the site of your choice
    request("https://cointelegraph.com/tags/cryptocurrencies", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    var $ = cheerio.load(html);
  
    // Select each element in the HTML body from which you want information.
  
    $("div.row.result").each(function(i, element) {
  
      var title = $(element).find("figure.col-sm-8").children("h2").text();
      var description = $(element).find("figure.col-sm-8").children("p").children("a").text();
      var link = $(element).find("figure.col-sm-8").children("p").children("a").attr("href");
      var image = $(element).find("figure.col-sm-4").children("div").children("a").children("div").children("img").attr("src");
  
      // An empty array to save the data that we'll scrape
      var result = {
          title: title,
          description: description,
          link: link,
          image: image
      };
  
      // Create a new db entry using the article model
      Article.create(result, function (err, doc) {
          if (err) {
              console.log(err);
          }
          else {
              console.log(doc);
          }
      })
  
      // Log the results once you've looped through each of the elements found with cheerio
      // console.log(result);
  });
  
  })
  res.redirect("/");
});


}


