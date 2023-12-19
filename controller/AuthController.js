const { AuthModel } = require("../Model/AuthModel");
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { RefreshToken } = require("../Model/refreshToken");
const { Vender } = require("../Model/Vender");
const { Operator } = require("../Model/OperatorModel");
const time = require("../Utils/Logger");



// const registeronPanel = async (req, res) => {
//   try {
//     const userName = req.body.userName;
//     const password = req.body.password;
//     const role = req.body.role;
//     const name = req.body.name;

//     if(!userName|| !password || !role || !name){
//       throw new Error("Required fields are missing in the request body");
//     }
    

//     // Check if the user with the same username already exists
//     const currentUser = await AuthModel.findOne({ userName: userName });
//     if (currentUser) {
//       return res.status(400).json({
//         userExists: true,
//         message: 'User with the provided username already exists.',
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Check if the vendor exists
//     let fuser=null;
//     console.log(role);
//     if(role==='Vendor'){
//        fuser = await Vender.findOne({ venderName: name });
       
//     }
//     else if(role==='Operator'){
//       fuser = await Operator.findOne({ OperatorName: name });
      
//     }

//     if (fuser) {
//       const nauthuser = new AuthModel({
//         userName: userName,
//         password: hashedPassword,
//         role: role,
//         userid: fuser._id,
//       });

//       const savedauthuser = await nauthuser.save();
//       res.status(200).json(savedauthuser);
//     } else {
//       res.status(404).json({
//         userExists: false,
//         message: 'Vendor not found with the provided name.',
//       });
//     }
//   } catch (err) {
//     console.log('err in registeronPanel' + err);
//     res.status(500).json({ userExists: false });
//   }
// };

// const registeronPanel = async (req, res) => {
//   try {
//     const userName = req.body.userName;
//     const password = req.body.password;
//     const role = req.body.role;
//     const name = req.body.name;

//     if(!userName|| !password || !role || !name){
//       throw new Error("Required fields are missing in the request body");
//     }
    

//     // Check if the user with the same username already exists
//     await AuthModel.findOne({ userName: userName })
//     .then((currentUser)=>{
//       console.log(
//         time.tds(),
//         req.ip,
//         `-/0auth/register--- findOne runned successfully`
//       );
//       if(currentUser){

//        return res.status(400).json({
//           userExists: true,
//           message: 'User with the provided username already exists.',
//         });
//       }
//     })
//     .catch((FindErr)=>{
//       console.log(
//         time.tds(),
//         req.ip,
//         `-/0auth/register--- error in FindOne ${FindErr.message}`
//       );
//       return res.status(500).json({
//         message: FindErr.message,
//       });
//     })
    

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Check if the vendor exists
//     let fuser=null;
    
//     if(role==='Vendor'){
//       await Vender.findOne({ venderName: name })
//       .then((FoundVendor)=>{
//         if(FoundVendor){
          
//           console.log(
//             time.tds(),
//             req.ip,
//             `-/0auth/register--- Vender Found `
//           );
//           fuser=FoundVendor;
//         }
//         else{
//           console.log(
//             time.tds(),
//             req.ip,
//             `-/0auth/register--- Vender not Found `
//           );
//           return res.status(500).json({message: "Vednor not found with the name"});
//         }
        
//       })
//       .catch((FounErr)=>{
//         console.log(
//           time.tds(),
//           req.ip,
//           `-/0auth/register--- error in Finding Vendor ${FounErr.message}`
//         );
//        return res.status(500).json({
//           message: FounErr.message,
//         });
//       })
//     }
//     else if(role==='Operator'){
//        await Operator.findOne({ OperatorName: name })
//        .then((FoundOperator)=>{
//         if(FoundOperator){
//           console.log(
//             time.tds(),
//             req.ip,
//             `-/0auth/register--- Operator Found `
//           );
//           fuser=FoundOperator;

//         }
//         else{
//           console.log(
//             time.tds(),
//             req.ip,
//             `-/0auth/register--- Operator not Found `
//           );
//           return res.status(500).json({message: "Operator not found with the name"});
//         }
//        })
//        .catch((FounErr)=>{
//         console.log(
//           time.tds(),
//           req.ip,
//           `-/0auth/register--- error in Finding Operator ${FounErr.message}`
//         );
//        return res.status(500).json({
//           message: FounErr.message,
//         });
//       })
      
//     }

//     if (fuser) {
//       const nauthuser = new AuthModel({
//         userName: userName,
//         password: hashedPassword,
//         role: role,
//         userid: fuser._id,
//       });


      

//       await nauthuser.save()
//       .then((savedauthuser)=>{
//         console.log(
//           time.tds(),
//           req.ip,
//           `-/0auth/register--- user Registeredcredential saved `
//         );
//         return  res.status(200).json(savedauthuser);
//       })
//       .catch((SavedErr)=>{
//         console.log(
//           time.tds(),
//           req.ip,
//           `-/0auth/register--- error in Saving Credentails`
//         );
//         return  res.status(500).json({ userExists: false , message:SavedErr.message });
//       })

//     } else {
//       return res.status(404).json({
//         userExists: false,
//         message: 'Vendor not found with the provided name.',
//       });
//     }
//   } catch (err) {
//     console.log(time.tds(), req.ip, ` - /0auth/register-- internal server err ${err.message}`);
   
//     return res.status(500).json({ userExists: false });
//   }
// };

// const FoundUseronthebasicofRole=async(role , name )=>{
//   let fuser=null;
//   if (role === 'Vendor') {
//     const FoundVendor = await Vender.findOne({ venderName: name });

//     if (FoundVendor) {
//       console.log(
//         time.tds(), 
//         `-/0auth/register  FoundUseronthebasicofRole --- Vendor Found`
//       );
//       fuser = FoundVendor;
//     } else {
//       console.log(
//         time.tds(),
//         `-/0auth/register--- FoundUseronthebasicofRole  Vendor not Found`
//       );
      
//     }
//   } else if (role === 'Operator') {
//     const FoundOperator = await Operator.findOne({ OperatorName: name });

//     if (FoundOperator) {
//       console.log(
//         time.tds(),
//         `-/0auth/register---  FoundUseronthebasicofRole Operator Found`
//       );
//       fuser = FoundOperator;
//     } else {
//       console.log(
//         time.tds(),
//         `-/0auth/register--- FoundUseronthebasicofRole Operator not Found`
//       );
      
//     }
//   }
//   return fuser;
// }


// const registeronPanel = async (req, res) => {
//   try {
//     const userName = req.body.userName;
//     const password = req.body.password;
//     const role = req.body.role;
//     const name = req.body.name;

//     if (!userName || !password || !role || !name) {
//       throw new Error("Required fields are missing in the request body");
//     }

//     // Check if the user with the same username already exists
//     const currentUser = await AuthModel.findOne({ userName: userName });

//     if (currentUser) {
//       console.log(
//         time.tds(),
//         req.ip,
//         `-/0auth/register--- User with the provided username already exists.`
//       );
//       return res.status(400).json({
//         userExists: true,
//         message: 'User with the provided username already exists.',
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//    let fuser=await FoundUseronthebasicofRole(role,name);
//   //  console.log(fuser);

//     if(fuser==null){
//       console.log(
//         time.tds(),
//         req.ip,
//         `-/0auth/register--- User with the provided username not exists.`
//       );
//         res.status(401).json({userExists:false , message:'user not found'});
//     }
//     else  {
//       const nauthuser = new AuthModel({
//         userName: userName,
//         password: hashedPassword,
//         role: role,
//         userid: fuser._id,
//       });

//       try {
//         const savedauthuser = await nauthuser.save();
//         console.log(
//           time.tds(),
//           req.ip,
//           `-/0auth/register--- User registered, credentials saved`
//         );
//         return res.status(200).json(savedauthuser);
//       } catch (SavedErr) {
//         console.log(
//           time.tds(),
//           req.ip,
//           `-/0auth/register--- Error in saving credentials`
//         );
//         return res.status(500).json({ userExists: false, message: SavedErr.message });
//       }

//     } 
//   } catch (err) {
//     console.log(
//       time.tds(),
//       req.ip,
//       ` - /0auth/register-- Internal server error: ${err.message}`
//     );
//     return res.status(500).json({ userExists: false });
//   }
// };



const registeronPanel = async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const role = req.body.role;
    const name = req.body.name;

    if (!userName || !password || !role || !name) {
      throw new Error("Required fields are missing in the request body");
    }

    // Check if the user with the same username already exists
    const currentUser = await AuthModel.findOne({ userName: userName });

    if (currentUser) {
      console.log(
        time.tds(),
        req.ip,
        `-/0auth/register--- User with the provided username already exists.`
      );
      return res.status(400).json({
        userExists: true,
        message: 'User with the provided username already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

      const nauthuser = new AuthModel({
        userName: userName,
        password: hashedPassword,
        role: role,
        name: name,
      });

      try {
        const savedauthuser = await nauthuser.save();
        console.log(
          time.tds(),
          req.ip,
          `-/0auth/register--- User registered, credentials saved`
        );
        return res.status(200).json(savedauthuser);
      } catch (SavedErr) {
        console.log(
          time.tds(),
          req.ip,
          `-/0auth/register--- Error in saving credentials`
        );
        return res.status(500).json({ userExists: false, message: SavedErr.message });
      }
  } catch (err) {
    console.log(
      time.tds(),
      req.ip,
      ` - /0auth/register-- Internal server error: ${err.message}`
    );
    return res.status(500).json({ userExists: false });
  }
};


const getuserid=async(role,name)=>{
  // console.log(role);
  // let fuser=null;
  if (role === 'Vendor') {
    const FoundVendor = await Vender.findOne({ venderName: name });

    if (FoundVendor) {
      console.log(
        time.tds(), 
        `-/0auth/register  FoundUseronthebasicofRole --- Vendor Found`
      );
      return FoundVendor._id.toString();
    } else {
      console.log(
        time.tds(),
        `-/0auth/register--- FoundUseronthebasicofRole  Vendor not Found`
      );
      
    }
  } else if (role === 'Operator') {
    const FoundOperator = await Operator.findOne({ OperatorName: name });

    if (FoundOperator) {
      console.log(
        time.tds(),
        `-/0auth/register---  FoundUseronthebasicofRole Operator Found`
      );
      return   FoundOperator._id.toString();
    } else {
      console.log(
        time.tds(),
        `-/0auth/register--- FoundUseronthebasicofRole Operator not Found`
      );
      
    }
  }
  else if(role==='Marketing'){
     return "89789789789";
  }
  else if(role==='Admin'){
    return "89789789789";

  }
  else if(role==='Checker'){
    return "89789789789";

  }
  return null;
}

// const FoundUseronthebasicofRole=async(role , name )=>{
//   let fuser=null;
//   if (role === 'Vendor') {
//     const FoundVendor = await Vender.findOne({ venderName: name });

//     if (FoundVendor) {
//       console.log(
//         time.tds(), 
//         `-/0auth/register  FoundUseronthebasicofRole --- Vendor Found`
//       );
//       fuser = FoundVendor;
//     } else {
//       console.log(
//         time.tds(),
//         `-/0auth/register--- FoundUseronthebasicofRole  Vendor not Found`
//       );
      
//     }
//   } else if (role === 'Operator') {
//     const FoundOperator = await Operator.findOne({ OperatorName: name });

//     if (FoundOperator) {
//       console.log(
//         time.tds(),
//         `-/0auth/register---  FoundUseronthebasicofRole Operator Found`
//       );
//       fuser = FoundOperator;
//     } else {
//       console.log(
//         time.tds(),
//         `-/0auth/register--- FoundUseronthebasicofRole Operator not Found`
//       );
      
//     }
//   }
//   return fuser;
// }


const login =async(req,res)=>{
    try{
        const userName=req.body.userName;
        const password=req.body.password;
      

        const authuser=await AuthModel.findOne({userName:userName});
       
        if(authuser==null){
            return res.status(400).json({
                userExists: false,
            });
        }

        try{
   
         const uid=await getuserid(authuser.role,authuser.name);
         if(uid===null){
          console.log(
            time.tds(),
            req.ip,
            ` - /0auth/login-- uid is null `
          );

          return res.status(401).json({
            message:'uid get is null'
          });
         }
         console.log(uid);
          
            if (await bcrypt.compare(password, authuser.password)) {
                const params = {
                  uid: uid,
                };
            
                
                const newAccessToken = jwt.sign(params, process.env.SECRET, {
                    expiresIn: "1hr",
                });
                
                const newRefreshToken = jwt.sign(params, process.env.REFRESH_SECRET, {
                    expiresIn: "30d",
                }); 
                generateDatabaseToken(uid, newRefreshToken);
            //   generateDatabaseToken(user._id.toString(), newRefreshToken);

              res.cookie("refreshToken", newRefreshToken, {
                // httpOnly: true,
                // sameSite: "none",
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
              });
        
              res.cookie("accessToken", newAccessToken, {
                // httpOnly: true,
                // sameSite: "none",
                secure: true,
                maxAge: 1 * 60 * 60 * 1000, // 15 mins
              });
              console.log(
                time.tds(),
                req.ip,
                ` - /0auth/login-- login done: of ${uid}`
              );
              res.status(200).json({
                userExists:true,
                accessToken: newAccessToken,
                userid:uid,
                role:authuser.role,
              })
            }
            else{
                res.status(401).json({
                    userExists:false,
                })
            }
        }
        catch(err){
            console.error("in login"+err);
            res.status(500).json({
                userExists:false,
            })
        }


    }
    catch(err){
          res.status(500).json({
            userExists: false,
          })
    }
}

const generateDatabaseToken = async (userId, refreshToken) => {
    try {
       await RefreshToken.findOneAndUpdate(
        { userId: userId },
        { refreshToken: refreshToken },
        { upsert: true, new: true }
      ).then((result)=>{
        if (!result) {
          console.log('Error updating or creating refreshToken.');
        }
        else{
          
          console.log(
            time.tds(),
            ` - /0auth/login generateDatabaseTokenfunction --  updated`
          );
        }
        
      })
      .catch((err)=>{
        console.log(
          time.tds(),
          ` - /0auth/login generateDatabaseTokenfunction --  ${err.message}`
        );
      })
  
      
    } catch (err) {
      console.log('Error in generateDatabaseToken: ' + err);
    }
  };


const getuseridfromJwt=(req,res)=>{
    try {
      const decodedToken = jwt.verify(req.cookies.accessToken, process.env.SECRET);
      res.status(200).json({userid:decodedToken.uid});
    } catch (error) {
      
      console.error('Error decoding JWT:', error.message);
      res.status(5000).json('something went wrong'+ error.message);
      
    }

  }


  
  


module.exports={login, registeronPanel,getuseridfromJwt};