const { Blogs } = require("../Model/Blogs");
const { FavblogsSchema } = require("../Model/FavBlogs");
const time = require("../Utils/Logger");

const addBlog = async (req, res) => {
  try {
    let newSlug = req.body.slugs;
    const {
      categories,
      title,
      paragraph,
      img,
      canonicalurl,
      metadesc,
      metakeyword,
      readingtime,
      tags,
    } = req.body;
    if (
      !newSlug ||
      !categories ||
      !title ||
      !paragraph ||
      !img ||
      !canonicalurl ||
      !metadesc ||
      !metakeyword ||
      !readingtime ||
      !tags
    ) {
      throw new Error("Required fields are missing in the request body");
    }
    let counter = 1;
    while (counter <= 100) {
      const foundBlog = await Blogs.findOne({ slugs: newSlug });

      if (foundBlog) {
        newSlug = `${newSlug}-${Math.random().toString(36).substring(2, 8)}`;
        counter++;
      } else {
        break; // Exit the loop if a unique slug is found
      }
    }

    if (counter > 100) {
      throw new Error("Unable to generate a unique slug after 100 attempts");
    }

    const Blog = new Blogs({
      categories: req.body.categories,
      title: req.body.title,
      paragraph: req.body.paragraph,
      slugs: newSlug,
      image: req.body.img,
      canonicalurl: req.body.canonicalurl,
      metadesc: req.body.metadesc,
      metakeyword: req.body.metakeyword,
      readingtime: req.body.readingtime,
      tags: req.body.tags,
    });

    await Blog.save()
      .then((savedBlog) => {
        console.log(
          time.tds(),
          req.ip,
          "-/0auth/addblog--- Blog saved successfully"
        );
        res.status(200).json(savedBlog);
      })
      .catch((saveError) => {
        console.log(
          time.tds(),
          req.ip,
          "- /0auth/addblog -- Error saving blog:"
        );
        res.status(400).json({ error: saveError.message });
      });
  } catch (err) {
    console.log(time.tds(), req.ip, ` - /0auth/addblog- ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const getAllRelevantBlogs = async (req, res) => {
  try {
    const { categoryWords } = req.params;

    if (!categoryWords) {
      throw new Error("Required fields are missing in the request body");
    }

    const categories = categoryWords.split(",");

    const categoryRegexes = categories.map(
      (category) => new RegExp(category, "i")
    );

    // Find blogs where at least one category matches
    await Blogs.find({ categories: { $in: categoryRegexes } })
      .then((allBlogs) => {
        console.log(
          time.tds(),
          req.ip,
          "-/0auth/getAllRelevantBlogs--- getgetAllRelevantBlogs"
        );
        res.status(200).json(allBlogs);
      })
      .catch((findError) => {
        console.log(
          time.tds(),
          req.ip,
          ` - /0auth/getAllRelevantBlogs - Error in finding blogs: ${findError.message}`
        );
        res.status(500).json({ error: findError.message });
      });
  } catch (err) {
    console.log(
      time.tds(),
      req.ip,
      ` - /0auth/getAllRelevantBlogs- ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
};

const getParticularBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      throw new Error("Required fields are missing in the request body");
    }
    await Blogs.findOne({ slugs: slug })
      .then((blog) => {
        console.log(
          time.tds(),
          req.ip,
          "-/0auth/0auth/blogs/:slug--- fetch data successfully"
        );
        res.status(200).json(blog);
      })
      .catch((FindOneErr) => {
        console.log(
          time.tds(),
          req.ip,
          `-/0auth/0auth/blogs/:slug--- error in fetching data ${FindOneErr}`
        );
        res.status(500).json({ error: findError.message });
      });
  } catch (err) {
    console.log(time.tds(), req.ip, ` - /0auth/blogs/:slug- ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const allBlog = async (req, res) => {
  try {
    await Blogs.find()
      .then((allBlog) => {
        console.log(
          time.tds(),
          req.ip,
          `--/0auth/allBlog --- fetch data successfully`
        );
        res.status(200).json(allBlog);
      })
      .catch((FindErr) => {
        console.log(
          time.tds(),
          req.ip,
          `--/0auth/allBlog --  unable to fetch allBlogs`
        );
        res.status(500).json({ error: FindErr.message });
      });
  } catch (err) {
    console.log(time.tds(), req.ip, `-  /0auth/allBlog-  ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const addFavCategories = async (req, res) => {
  try {
    const arrfav = req.body.favArr;

    if (!arrfav) {
      throw new Error("Required fields are missing in the request body");
    }

    await FavblogsSchema.deleteMany({})
      .then((FavBlog) => {
        console.log(
          time.tds(),
          req.ip,
          `-  /0auth/addFavCategories-  all FavBlog Deleted SuccessFully`
        );
      })
      .catch((FavDeleteErr) => {
        console.log(
          time.tds(),
          req.ip,
          `--/0auth/addFavCategories --  unable to Delete FavBlogs`
        );
        res.status(500).json({ error: FavDeleteErr.message });
      });

    const nfavCate = new FavblogsSchema({
      favBlogSlug: arrfav,
    });

    await nfavCate
      .save()
      .then((savedFavBlog) => {
        console.log(
          time.tds(),
          req.ip,
          `-  /0auth/addFavCategories-  all FavBlog added`
        );
        res.status(200).json(savedFavBlog);
      })
      .catch((SavedError) => {
        console.log(
          time.tds(),
          req.ip,
          `-  /0auth/addFavCategories-  unable to save FavBlog `
        );
        res.status(500).json({ error: SavedError.message });
      });
  } catch (err) {
    console.log(
      time.tds(),
      req.ip,
      `-  /0auth/addFavCategories-  ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
};


const getAllFavCategories = async (req, res) => {
  let slugs ;

  try {
    await FavblogsSchema.find().select("favBlogSlug")
    .then((Favblog)=>{
      console.log(
        time.tds(),
        req.ip,
        `-  /0auth/getFavCategoriesblog-  Fav blog slugs are fetched`
      );
        slugs  = Favblog.map((entry) => entry.favBlogSlug).flat();

    })
    .catch((FavBlogErr)=>{
      console.log(
        time.tds(),
        req.ip,
        `-  /0auth/getFavCategoriesblog- unable to fetched Fav blog slugs `
      );
      res.status(500).json({ error: FavBlogErr.message })
    })


    await Blogs.find({ slugs: { $in: slugs } })
    .then((matchedFav)=>{
      console.log(
        time.tds(),
        req.ip,
        `-  /0auth/getFavCategoriesblog-  Fav blogs Fetched`
      );
      res.status(200).json(matchedFav);
    })
    .catch((MatchErr)=>{
      console.log(
        time.tds(),
        req.ip,
        `-  /0auth/getFavCategoriesblog-  unable to Find Matched blog ${MatchErr}`
      );
      res.status(500).json({err:MatchErr.message});
    })
  } catch (err) {
    console.log(
      time.tds(),
      req.ip,
      `-  /0auth/getFavCategoriesblog-  ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
};


const deleteBlogById = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      throw new Error("Required fields are missing in the request body");
    }

    await  Blogs.findByIdAndDelete(id)
    .then((DeletedBlog)=>{
      console.log(
        time.tds(),
        req.ip,
        `-  /0auth/deletebyid-  ${id} Blog Deleted SuccessFully`
      );
      res.status(200).json({ message: "Blog deleted successfully" });
    })
    .catch((DeleteError)=>{
      console.log(
        time.tds(),
        req.ip,
        `--/0auth/deletebyid --  unable to Delete Blog`
      );
      res.status(500).json({ error: DeleteError.message });
    })
  } catch (err) {
    console.log(
      time.tds(),
      req.ip,
      `-  /0auth/deletebyid-  ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
};

const updateBlogById = async (req, res) => {
  try {

    const blogId = req.params.id;

    if(!blogId){
      throw new Error("Blog ID is required in the URL parameter");
    }
    await Blogs.findByIdAndUpdate(blogId, req.body, {
      new: true,
    })
    .then((updatedBlog)=>{
      console.log(
        time.tds(),
        req.ip,
        `-  /0auth/updateblogbyId/:id-  blog updated successfully`
      );
      res.status(200).json({ message: "Blog updated successfully", updatedBlog })
    })
    .catch((UpdateErr)=>{
      console.log(
        time.tds(),
        req.ip,
        `-  /0auth/updateblogbyId/:id-  unable to edit ${UpdateErr.message}`
      );
      res.status(500).json({ error: UpdateErr.message });
    })

  } catch (err) {
    console.log(
      time.tds(),
      req.ip,
      `-  /0auth/updateblogbyId/:id-  ${err.message}`
    );
    res.status(500).json({ error: err.message });
    
  }
};

module.exports = {
  addBlog,
  getParticularBlog,
  getAllRelevantBlogs,
  allBlog,
  addFavCategories,
  getAllFavCategories,
  deleteBlogById,
  updateBlogById,
};
