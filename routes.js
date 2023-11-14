import { Router } from 'express'; // Import the Router from 'express'
import { addBlog, allBlog, getAllRelevantBlogs, getParticularBlog } from './controller/BlogController.js';



const router = Router(); // Create an instance of the Router

router.post('/addblog',addBlog);
router.get('/allBlog',allBlog);
router.get('/blogs/:slug',getParticularBlog);
router.get('/getallRelativeBlog/:categoryWords',getAllRelevantBlogs)


export default router; // Export the router instance