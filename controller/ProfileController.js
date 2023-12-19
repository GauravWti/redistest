const express=require('express');
const { Vender } = require('../Model/Vender');
const { Operator } = require('../Model/OperatorModel');
const time = require("../Utils/Logger");



const getProfileInfoById=async(req,res)=>{
    try{
       const id=req.body.id;
       const role=req.body.role;

       if(!id || !role){
             throw new Error("Required fields are missing in the request body");
       }

       if(role==='Vendor'){
        Vender.findById(id)
            .then(fuserdetail => {
                if (fuserdetail) {
                    console.log(
                        time.tds(),
                        req.ip,
                        "-/0auth/getprofiledata--- Vender found  successfully"
                      );
                res.status(200).json(fuserdetail);
                } else {
                    console.log(
                        time.tds(),
                        req.ip,
                        "-/0auth/getprofiledata--- Vender not found "
                      );
                res.status(404).json({ error: 'Vendor not found' });
                }
            })
            .catch(error => {
                console.log(
                    time.tds(),
                    req.ip,
                  `- /0auth/addOperator -- Error finding vendor `
        
                  );
               
                res.status(500).json({ error: 'Internal Server Error' });
            });

       }
       else{
        Operator.findById(id)
        .then(fuserdetail => {
            if (fuserdetail) {
                console.log(
                    time.tds(),
                    req.ip,
                    "-/0auth/getprofiledata--- Operator found  successfully"
                  );
             res.status(200).json(fuserdetail);
            } else {
                console.log(
                    time.tds(),
                    req.ip,
                    "-/0auth/getprofiledata--- Operator not found  "
                  );
              res.status(404).json({ error: 'Operator not found' });
            }
        })
        .catch(error => {
            console.log(
                time.tds(),
                req.ip,
              `- /0auth/addOperator -- Error finding Operator `
    
              );
            res.status(500).json({ error: 'Internal Server Error' });
        });



        
       }
    }
    catch(err){
        console.log('err in getProfileInfoById  '+err);
        res.status(500).json({error})
    }
}

module.exports={getProfileInfoById};