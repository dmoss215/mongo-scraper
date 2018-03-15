var request = require("request");
var cheerio = require("cheerio");
// Requiring our Comment and Article models
var Comment = require("../models/comment.js");
var Article = require("../models/article.js");