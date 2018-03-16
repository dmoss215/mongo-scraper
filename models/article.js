var mongoose = require("mongoose");

// Create Schema object constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
        unique: true
    }

});

// Create the Article model with the Article Schema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;