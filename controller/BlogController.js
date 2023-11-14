import { Blogs } from "../Model/Blogs.js";


export const addBlog = async (req, res) => {
     
            try {
                  
                  const Blog = new Blogs({
                    categories:req.body.categories,
                    title:req.body.title,
                    paragraph:req.body.paragraph,
                    slugs:req.body.slugs,
                    image:req.body.img,
                       
                  });
                  await Blog.save();
                  res.status(200).json(Blog);
                } catch (err) {
                  res.status(400).json({ error: err.message });
                }
    };

    
    export const getAllRelevantBlogs = async (req, res) => {
      try {
        // Get categories as an array of words from URL parameters
        const { categoryWords } = req.params; // Assuming the categories are passed as a parameter
    
        // Split the received parameter into an array of words
        const categories = categoryWords.split(',');

        // Create a case-insensitive regular expression for each category
        const categoryRegexes = categories.map(category => new RegExp(category, 'i'));
    
        // Find blogs where at least one category matches
        const allBlogs = await Blogs.find({ categories: { $in: categoryRegexes } });
    
        res.json(allBlogs); // Return the found blogs as a response
      } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while fetching blogs');
      }
    };
    

    export const getParticularBlog = async (req, res) => {
      try {
        // Assuming the slug is a parameter in the URL
       
        const { slug } = req.params;
    
        // Find a blog post using the slug
        const foundPost = await Blogs.findOne({ slugs: slug });
    
        if (foundPost) {
          res.status(200).json(foundPost);
        } else {
          res.status(404).json({ message: 'Blog post not found' });
        }
      } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };

    export const allBlog=async(req,res)=>{
      try{
        
         const allBlogs=await Blogs.find();
         
         res.status(200).json(allBlogs);
      }
      catch(err){
            res.status(400).json({ error: err.message });
      }
    }



   
    
    