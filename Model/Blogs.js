import mongoose from "mongoose";

const blogs = new mongoose.Schema(
  {
    categories: {
      type: String,
      required: true,
      trim: true,
    },
title : {
      type: String,
      required: true, 
      trim: true,
  },
  paragraph : {
      type: String,
      required: true,
     
      trim: true,
  },
    slugs:{
      type : String,
      required : true,
      trim:true,
    },
    image:{
      type:String,
      required:true,
      
    }
    
  },
  { timestamps: true },
);

export const Blogs = mongoose.model("Blogs", blogs);