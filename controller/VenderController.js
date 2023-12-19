const express = require('express');
const { Vender, cartransaction, carquantity } = require('../Model/Vender'); // Update this path
const mailSender = require('../Utils/utils');
const { default: mongoose } = require('mongoose');
const { addReseravtionbookinginOperator } = require('./OperatorController');
const time =require('../Utils/Logger');




const addnewvender = async (req, res) => {
  try {
    const { venderName, contact, document, bankDetails } = req.body;

    if(!venderName || !contact || !bankDetails){
      throw new Error("Required fields are missing in the request body");
    }
    // Create the vender instance without cars and transactions
    const newVender = new Vender({
      venderName,
      contact,
      document,
      bankDetails,
      moneyReceived: [], // Empty array for transactions
      cars: [], // Empty array for cars
    });

    // Save the vender instance
    // const savedVender = await newVender.save();
    await newVender.save()
    .then((savedVendor)=>{
      console.log(
        time.tds(),
        req.ip,
        "-/0auth/newVendor--- New Vendor added"
      );
      res.status(200).json(savedVendor);
    })
    .catch((SavedError)=>{
      console.log(
        time.tds(),
        req.ip,
        "- /0auth/newVendor -- Error saving Vendor:"
      );
      res.status(400).json({error:SavedError.message});
    })

    // res.status(201).json(savedVender);

  } catch (error) {
   
      // Other errors
      console.log(
        time.tds(),
        req.ip,
        `- /0auth/newVednor --  1  ${error.message}` 
      );
      res.status(500).json({ error: error.message });
    
  }
};



const addCarquantitytoParticularVender = async (req, res) => {
  try {
    const { venderName, cars } = req.body;

    if(!venderName || !cars){
      throw new Error("Required fields are missing in the request body");
    }
    

    // Assuming Vender is your model
  await Vender.findOne({ venderName: venderName })
    .then((foundVender)=>{
      if(foundVender){

      
      console.log(
        time.tds(),
        req.ip,
        "-/0auth/addCarquantity--- addCarquantitytoParticularVender  findone "
      );

      foundVender.cars=cars;
    

      // Save the changes
       foundVender.save()
       .then((foundV)=>{
          console.log(
            time.tds(),
            req.ip,
            "-/0auth/addCarquantity--- addCarquantitytoParticularVender save"
          );
          res.status(200).json(foundV);
       })
       .catch((SavedErr)=>{
            console.log(
              time.tds(),
              req.ip,
              `-/0auth/addCarquantity--- addCarquantitytoParticularVender saveError ${SavedErr.message}`
            );
            res.status(500).json({message:'error is saving'});
       })

      }
      else{
        console.log(
          time.tds(),
          req.ip,
          `-/0auth/addCarquantity--- addCarquantitytoParticularVender Vendor not Found`
        );
        res.status(404).json({ error: 'Vender not found' });
      }
    })
    .catch((findError)=>{
      console.log(
        time.tds(),
        req.ip,
        "-/0auth/addCarquantity--- addCarquantitytoParticularVender Error in FindOne"
      );
      res.status(500).json({message:findError.message})
    })
  } catch (err) {
    console.log(
      time.tds(),
      req.ip,
      `-/0auth/addCarquantity--- addCarquantitytoParticularVender ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
};

const getAllCarsofParticularuser=async(req,res)=>{
  try{
     const venderName=req.body.venderName;

     if(!venderName){
      throw new Error('Required fields are missing in the request body')
     }


    await Vender.findOne({venderName:venderName})
    .then((FVendor)=>{
      if(FVendor){
        
          console.log(
            time.tds(),
            req.ip,
            "-/0auth/getAllCars ---  getAllCarsofParticularuser  Cars of vednor is Found"
            ); 
            res.status(200).json(FVendor.cars);
        }
       

    })
    .catch((FindErr)=>{
      console.log(
        time.tds(),
        req.ip,
        `-/0auth/getAllCars ---  getAllCarsofParticularuser  Err in finding ${FindErr.message} `
        ); 
        res.status(500).json('error in getAllCarsofParticularuser ')
    })
  }
  catch(err){
    console.log(
      time.tds(),
        req.ip,
      `-/0auth/getAllCars ---  getAllCarsofParticularuser   ${err.message} `
      ); 
    console.log('err fetching the getAllCars');
  }
}


const getallVender = async (req, res) => {
    await Vender.find({}, 'venderName -_id')
    .then((FindVendorNames)=>{
      console.log(
        time.tds(),
        req.ip,
        "-/0auth/getALlVender--- getallVender Found Vendor Successfully"
      )
      res.status(200).json(FindVendorNames);

    })
    .catch((err)=>{
      console.log(
        time.tds(),
        req.ip,
        `-/0auth/getALlVender--- getallVender err in Found Vendor ${err.message}`
      )
      res.status(500).json({ error: 'Internal Server Error' });

    })

  
};

const getVendorifCarPresent=async(req,res)=>{
  // const vendorname=req.body.vendorname;
  const carType=req.body.cartype;
  if(!carType){
    throw new Error("Required fields are missing in the request body");
  }

  
    try {
      const vendors = await Vender.find({
        'cars.vehicleType': carType,
        'cars.quantity': { $gt: 0 },
      }, 'venderName');
  
      console.log(
        time.tds(),
        req.ip,
        `- /0auth/getVendorifCarPresent -- Found Vendor Successfully`
      );

  
      res.status(200).json({ vendors });
    }
  catch(err){
    console.log(
      time.tds(),
      req.ip,
      `- /0auth/getVendorifCarPresent -- Error Finding  Vnedor: ${err.message}`
    );
      res.status(500).json('Internal server error'+err)
  }
}

// const addReservationToVender = async (req, res) => {
//   try {
//     const venderName = req.body.venderName;
//     const reservationId = req.body.reservationId;
//     const carType = req.body.carType; // Assuming carType is included in the request

//     const foundVender = await Vender.findOne({ venderName: venderName });

//     if (foundVender) {
//       // Find the car in the vender's cars array
//       const car = foundVender.cars.find((c) => c.vehicleType === carType);

//       if (car && car.quantity > 0) {
//         // Subtract quantity by 1
//         car.quantity--;

//         // Add the current time to the booking
//         const timeOfBooking = new Date().toISOString();

//         // Assuming "booking" is an array in the venderSchema
//         foundVender.booking.push({ reservationId: reservationId, timeofbooking: timeOfBooking });
        
//         const newcarTran=new cartransaction({
//           carType,
//          status:'pending'
//         })
//         const savedTrans = await newcarTran.save();
//         const moneyReceivedEntry = {
//           year: new Date().getFullYear(),
//           month: new Date().toLocaleString('default', { month: 'long' }),
//           time: new Date().toLocaleTimeString(),
//           day: new Date().toLocaleDateString(),
//           transactions: [savedTrans._id],
//         };
    
//         foundVender.moneyReceived.push(moneyReceivedEntry);


//         // Save the changes
//         await foundVender.save();
//         await mailSender(foundVender.contact.email, "Booking details from wti",  `click on link : <a href="">${link}</b>
//         `)
//           .then(() => {
//             console.log("confirmation mail send");
//           })
//           .catch((err) => {
//             console.log("unable to send confirmation mail");
//             console.log(err);
//           });

//         return res.status(200).json({ message: 'Reservation added successfully' });
//       } else {
//         return res.status(400).json({ message: 'Car type not found or quantity is insufficient' });
//       }
//     } else {
//       return res.status(404).json({ message: 'Vendor not found' });
//     }
//   } catch (err) {
//     console.error('Error adding reservation to vendor:', err);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

const addReservationToVender = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const venderName = req.body.venderName;
    const reservationId = req.body.reservationId;
    const carType = req.body.carType; // Assuming carType is included in the request
    const Operatorid=req.body.Operatorid;
    const role=req.body.role;
    if(!venderName || !reservationId || !carType || !Operatorid ||!role){
       throw new Error("Required fields are missing in the request body");
    }

    try{
      const foundVender = await Vender.findOne({ venderName: venderName }).session(session);

      if (foundVender) {
  
        const car = foundVender.cars.find((c) => c.vehicleType === carType);
  
        if (car && car.quantity > 0) {
          car.quantity--;
  
          const timeOfBooking = new Date().toISOString();
          foundVender.booking.push({ reservationId: reservationId, timeofbooking: timeOfBooking });
  
          const newcarTran = new cartransaction({
            carType,
            status: 'pending',
          });
  
          // const savedTrans = await newcarTran.save({ session });
             await newcarTran.save({session})
             .then((savedTrans)=>{
              
              console.log(
                time.tds(),
                req.ip,
                `-/0auth/addReservationToVender--- newcarTran Saved Successfully`
              );

              const moneyReceivedEntry = {
                year: new Date().getFullYear(),
                month: new Date().toLocaleString('default', { month: 'long' }),
                time: new Date().toLocaleTimeString(),
                day: new Date().toLocaleDateString(),
                transactions: [savedTrans._id],
                reservationId:reservationId,
              };
              foundVender.moneyReceived.push(moneyReceivedEntry);

             })
             .catch((SavedErr)=>{
              console.log(
                time.tds(),
                req.ip,
                `-/0auth/addReservationToVender--- Err in Saving newTran ${SavedErr.message}`
              );
             })
          
          
  
          
  
          await foundVender.save({ session })
          .then((SavedVendor1)=>{
 
            console.log(
              time.tds(),
              req.ip,
              `-/0auth/addReservationToVender--- foundVender Saved Successfully`
            );

             // Assuming you have a correct link to include in the email
                const link = '...'; // Provide the actual link
                const htmlelment=`<table className="min-w-full bg-white border border-gray-300 shadow-lg">
                <thead>
                  <tr className="text-[5px] sm:text-[10px] bg-blue-400">
                    <th className=" sm:py-2 sm:px-2 border-b">Booking No</th>
                    <th className="sm:py-2 sm:px-2 border-b">Vehicle type</th>
                    <th className="sm:py-2 sm:px-2 border-b">pickup Time</th>
                    <th className="sm:py-2 sm:px-2 border-b">drop time</th>
                    <th className="sm:py-2 sm:px-2 border-b">pickup location</th>
                    <th className="sm:py-2 sm:px-2 border-b">drop location</th>
                    <th className="sm:py-2 sm:px-2 border-b">Customer</th>
                    <th className="sm:py-2 sm:px-2 border-b">Contact No</th>
        
        
            
                  </tr>
                </thead>
                <tbody>
                <tr>
                      <td className="border px-2 py-2">${reservationId}</td>
                      <td className="border px-2 py-2">${carType}</td>
                      <td className="border px-2 py-2">{data.notAssign}</td>
                      <td className="border px-2 py-2">{data.complete}</td>
                      <td className="border px-2 py-2">{data.pending}</td>
        
        
                    </tr>
                </tbody>
                `

                 mailSender(foundVender.contact.email, 'Booking details from wti', htmlelment)
                .then(() => {
                  console.log('Confirmation mail sent');
                })
                .catch((err) => {
                  console.log('Unable to send confirmation mail');
                  console.log(err);
                });

                
          })
          .catch((Err)=>{
            console.log(
              time.tds(),
              req.ip,
              `-/0auth/addReservationToVender--- Error in Saving foundVender ${Err.message}`
            );    
          })
  
          
  
         if(role==='Operator'){           
           addReseravtionbookinginOperator(Operatorid,reservationId);
          }
           await session.commitTransaction();
           session.endSession();
           
           return res.status(200).json({ message: 'Reservation added successfully' });
        } else {
          return res.status(400).json({ message: 'Car type not found or quantity is insufficient' });
        }
      } else {
        console.log(
          time.tds(),
          req.ip,
          `-/0auth/addReservationToVender--- Vendor not found`
        );
        return res.status(404).json({ message: 'Vendor not found' });
      }
    }catch(err){
      
        console.log(
          time.tds(),
          req.ip,
          `-/0auth/addReservationToVender---Error in Finding Vendor  ${err.message} `
        );
        await session.abortTransaction();
        session.endSession();
         return res.status(500).json({ message: 'Internal Server Error' });

    }
    
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error('Error adding reservation to vendor:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



const setCarNumbertovender = async (req, res) => {
  try {
    
    const venderId = req.params.venderId;

    const carType = req.body.carType;
    const carNumber = req.body.carNumber;
    const startTime = req.body.startTime;
    const startDay = req.body.startDay;
    const endTime = req.body.endTime;
    const EndDay = req.body.EndDay;

    const reservationId = req.body.reservationId;

    

    let transactionId;
    let carTransactionToUpdate;
    let Vendor;
    // Find the vender by ID
     await Vender.findById(venderId)
     .then((vender)=>{
        Vendor=vender
      if (!vender) {
      console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId- Vender not found`);

        return res.status(404).json({ error: 'Vender not found' });
      }
  
      // Find the cartransaction by reservationId
       carTransactionToUpdate = vender.moneyReceived.find(
        (entry) => entry.reservationId === reservationId
      );
  
      if (!carTransactionToUpdate) {
       console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId- Cartransaction not found for the given reservationId`);
        return res.status(404).json({ error: 'Cartransaction not found for the given reservationId' });
      }

       transactionId = carTransactionToUpdate.transactions;


     })
     .catch((FindError)=>{
        console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId- Error Finding Vendor `);
       return res.status(500).json({ error: FindError.message });
      
        
     })

    


    // Find the corresponding document in the cartransaction collection
    await cartransaction.findById(transactionId)
     .then((transactionModel)=>{

        console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId- cartransaction found `);
        if (transactionModel) {
          transactionModel.status = 'assigned';
          transactionModel.carNumber = carNumber;
          transactionModel.carType = carType;
          transactionModel.startDay = startDay;
          transactionModel.startTime = startTime;
          transactionModel.EndDay = EndDay;
          transactionModel.endTime = endTime;
    
          // Save the modified document
           transactionModel.save()
           .then((SavedModel)=>{
            console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId-  successfully saved transactionModel `);
              
           })
           .catch((SavedErr)=>{
              console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId- unable to save transactionModel ${SavedErr.message}`);
             return res.status(500).json({ error: SavedErr.message }); 
           })
        }

     })
     .catch((transactionModelErr)=>{
      console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId- unable to save transactionModel ${transactionModelErr.message}`);
      return res.status(500).json({ error: transactionModelErr.message }); 
    })

   

    // Save the vender with the updated moneyReceived array
    await Vendor.save()
    .then((savedVendor)=>{
      console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId-  successfully  Vendor saved `);

      
    })
    .catch((err)=>{
      console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId-  error in saving  Vendor ${err.message}`);

      return res.status(500).json({ error: err.message })
    })
    return res.status(201).json(carTransactionToUpdate);

  } catch (error) {
    
    console.log(time.tds(), req.ip, ` - /0auth/setCarNumbertovender/:venderId- ${error.message}`);
    if (error.code === 11000) {
      // Duplicate key error
     return res.status(400).json({ error: 'Vender with the same name already exists.' });
    } else {
      // Other errors
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
};


const getAllBookingIdofParticularVender=async(req,res)=>{
  try{
    
    const venderID=req.params.venderID;
    
    const getAllBooking=await Vender.find({_id:venderID}).select('booking');

    res.status(200).json(getAllBooking);

  }
  catch(err){
    console.log(
      time.tds(),
      req.ip,
      `-/0auth/getAllBookingIdofParticularVender--- error in finding booking + ${err.message}`
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

const getstatusofCarTransactionforVendor=async(req,res)=>{
  try{
    const venderId = req.params.venderId;
    const reservationId = req.body.reservationId;
  
    const vender = await Vender.findById(venderId);

    if (!vender) {
      console.log(
        time.tds(),
        req.ip,
        `-/0auth/getstatusofCarTransactionforVendor--- vendor not found `
      );
      return res.status(404).json({ error: 'Vender not found' });
    }

    const carTransactionToUpdate = vender.moneyReceived.find(
      (entry) => entry.reservationId === reservationId
    );

    if (!carTransactionToUpdate) {
      console.log(
        time.tds(),
        req.ip,
        `-/0auth/getstatusofCarTransactionforVendor--- carTransactionToUpdate not found `
      );
      return res.status(404).json({ error: 'Cartransaction not found for the given reservationId' });
    }
    console.log(
      time.tds(),
      req.ip,
      `-/0auth/getstatusofCarTransactionforVendor--- carTransactionToUpdate  found `
    );
    const transactionId = carTransactionToUpdate.transactions;

    // Find the corresponding document in the cartransaction collection
    const transactionModel = await cartransaction.findById(transactionId);


    if(transactionModel){
      console.log(
        time.tds(),
        req.ip,
        `-/0auth/getstatusofCarTransactionforVendor--- transactionModel  found `
      );
      res.status(200).json({statuscar:transactionModel.status});
    }

  }
  catch(err){
      console.log('err in  getstatusofCarTransactionforVendor '+err);
  }
}


const getAllBookingCarOfParticularVendor = async (req, res) => {
  try {
    const venderID = req.params.venderId;

    // Find the vendor by ID
    const fvendor = await Vender.findById(venderID);
    
    if (!fvendor) {
      console.log(
        time.tds(),
        req.ip,
        "-/0auth/getAllBookingCarOfParticularVendor--- Vednor not found"
      );
      return res.status(404).json({ error: 'Vender not found' });
    }

    const fmoneyReceived = fvendor.moneyReceived;
    const resarr = [];

    fvendor.cars.forEach((car) => {
      resarr.push({
        cartype: car.vehicleType,
        ondutycar: 0,
        notAssign: car.quantity,
        complete:0,
        pending:0,
      });
    });

    for (const transactionitem of fmoneyReceived) {
      const transactionid = transactionitem.transactions;
      const fcartransaction = await cartransaction.findById(transactionid);
      // console.log(fcartransaction);
      
      const existingCarType = resarr.find(item => item.cartype === fcartransaction.carType);

      if (existingCarType) {
        // If the car type already exists in resarr, update the on duty count
        if(fcartransaction.status==='pending'){
          existingCarType.pending += 1;
        }
        else if(fcartransaction.status==='assigned'){
          existingCarType.ondutycar += 1;
        }
        else if(fcartransaction.status==='complete'){
          existingCarType.complete += 1;
        }
        
        // Assuming notAssign is the available quantity
      } else {
        // If the car type doesn't exist in resarr, add a new entry
        resarr.push({
          cartype: fcartransaction.carType,
          ondutycar: 1,
          notAssign: 0, // Assuming notAssign is the available quantity
        });
      }
    }
    

    res.status(200).json(resarr);
    console.log(
      time.tds(),
      req.ip,
      "-/0auth/getAllBookingIdofParticularVender--- successfully send list of booking status to vendor"
    );

  } catch (err) {
    console.log(
      time.tds(),
      req.ip,
      `-/0auth/getAllBookingIdofParticularVender--- Error in getAllBookingCarOfParticularVendor: ${err.message}`
    );
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = {getVendorifCarPresent ,addnewvender, addCarquantitytoParticularVender , getAllCarsofParticularuser,getallVender , addReservationToVender,setCarNumbertovender,getAllBookingIdofParticularVender, getstatusofCarTransactionforVendor ,getAllBookingCarOfParticularVendor};
