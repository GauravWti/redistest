const express=require('express');
const { Operator } = require('../Model/OperatorModel');
const time = require("../Utils/Logger");


const addnewOperator=async(req,res)=>{
    try{
       const {OperatorName,contact}=req.body;
       if(!OperatorName || !contact){
        throw new Error("Required fields are missing in the request body");
       }

       const newOperator=new Operator({
        OperatorName,
        contact,
       })

       await newOperator.save()
       .then((savedOperator)=>{
        console.log(
          time.tds(),
          req.ip,
          "-/0auth/addOperator--- Operator saved successfully"
        );
        res.status(201).json(savedOperator);
       })
       .catch((savedError)=>{
          console.log(
            time.tds(),
            req.ip,
          "- /0auth/addOperator -- Error saving Operator"

          );
        res.status(400).json({ error: savedError.message });
       })

    }
    catch(error){
        console.log(time.tds(), req.ip, ` - /0auth/addnewOperator- ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

const getidByNameOfOperator=async(OperatorName)=>{
    try{
        fOperator=await Operator.findOne({OperatorName});
        if(fOperator){
            return {
                OperatorExist:true,
                fOperator
            };
        }
        else{
            return {
               OperatorExist:false
            }
        }
    }
    catch(err){
       console.log('error in getidByNameOfOperator'+err);
    }
}


const addReseravtionbookinginOperator = async (Operatorid, reservationId) => {
    try {
      const operator = await Operator.findById(Operatorid);
  
      if (!operator) {
      console.log('Operator not found ');
        return;
      } else {
        // Get the current time
        const currentTime = new Date();
        const formattedTime = currentTime.toISOString(); // or use any other desired format
  
        // Add the reservation booking to the operator's bookingAssign array
        operator.bookingAssign.push({
          timeofbooking: formattedTime,
          reservationId,
        });
  
        // Save the updated operator document
        // const updatedOperator = await operator.save();

        operator.save()
        .then((SavedOperator)=>{

          console.log(
            time.tds(),
            req.ip,
            "- addReseravtionbookinginOperator function -- Opeartor Saved Succesfully:"
          );
          
        })
        .catch((SavedErr)=>{
          console.log(
            time.tds(),
            req.ip,
            "- addReseravtionbookinginOperator function -- Error saving Operator:"
          );

        })
  
        // Respond with the updated operator
        
      }
    } catch (err) {
      console.log('Error in addReseravtionbookinginOperator API:', err);
      return
    }
  };
  
module.exports={addnewOperator,getidByNameOfOperator,addReseravtionbookinginOperator}