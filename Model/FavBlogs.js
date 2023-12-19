// Importing the mongoose library
const mongoose = require('mongoose');

// Defining the schema for the Blogs model
const favblogsSchema = new mongoose.Schema(
  {
    favBlogSlug:[
        {
            type:String
        }
    ]
  },
  { timestamps: true },
);

// Creating the Blogs model
const FavblogsSchema = mongoose.model('favblogsSchema', favblogsSchema);

// Exporting the Blogs model using CommonJS syntax
module.exports = {FavblogsSchema};
