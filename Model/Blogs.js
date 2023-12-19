
const mongoose = require('mongoose');


const blogsSchema = new mongoose.Schema(
  {
    categories: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    paragraph: {
      type: String,
      required: true,
      trim: true,
    },
    slugs: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    canonicalurl:{
      type:String,
      
    },
    metadesc:{
      type:String,

    },
    metakeyword:{
      type:String,
    },
    readingtime:{
      type:String,
    },
    tags:{
      type:String,
    }

  },
  { timestamps: true },
);


const Blogs = mongoose.model('Blogs', blogsSchema);


module.exports = {Blogs};
