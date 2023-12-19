// routes.js
const { Router } = require('express');
const { addBlog, allBlog, getAllRelevantBlogs, getParticularBlog, addFavCategories, getAllFavCategories, deleteBlogById, updateBlogById } = require('./controller/BlogController.js');
const {addnewvender, addCarquantitytoParticularVender, getAllCarsofParticularuser, getallVender, addReservationToVender, setCarNumbertovender, getAllBookingIdofParticularVender, getstatusofCarTransactionforVendor, getAllBookingCarOfParticularVendor, getVendorifCarPresent} = require('./controller/VenderController.js');
const { login, registeronPanel, getuseridfromJwt } = require('./controller/AuthController.js');
const { addnewOperator } = require('./controller/OperatorController.js');
const { getProfileInfoById } = require('./controller/ProfileController.js');
const { addnewMarketingEmp } = require('./controller/MarketingController.js');

const router = Router(); // Create an instance of the Router


router.post('/addFavCategories',addFavCategories);
router.get('/getFavCategoriesblog',getAllFavCategories);

router.post('/addblog', addBlog);
router.get('/allBlog', allBlog);
router.get('/blogs/:slug', getParticularBlog);
router.get('/getallRelativeBlog/:categoryWords', getAllRelevantBlogs);
router.delete('/deletebyid',deleteBlogById);
router.put('/updateblogbyId/:id',updateBlogById);




router.post('/addvender',addnewvender);
router.post('/addCarquantity',addCarquantitytoParticularVender);
router.post('/getAllCars',getAllCarsofParticularuser);

router.get('/getALlVender',getallVender);
router.post('/addReservationToVender',addReservationToVender);
router.post('/setCarNumbertovender/:venderId',setCarNumbertovender);
router.post('/getstatusofCarTransactionforVendor/:venderId',getstatusofCarTransactionforVendor);
router.post('/getVendorifCarPresent',getVendorifCarPresent);


router.get('/getAllBookingIdofParticularVender/:venderID',getAllBookingIdofParticularVender)
router.get('/getAllBookingCarOfParticularVendor/:venderId',getAllBookingCarOfParticularVendor);

// login
router.post('/login',login);
router.post('/register',registeronPanel);
router.get('/accesstoken',getuseridfromJwt)

///Operator Router
router.post('/addnewOperator',addnewOperator);



//profileRouter
router.post('/getprofiledata',getProfileInfoById)



// Marketing controller
router.post('/addnewMarketing',addnewMarketingEmp);
module.exports = router; // Export the router instance directly
