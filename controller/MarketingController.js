const express=require('express');
const { Marketing } = require('../Model/Marketing');
const time = require("../Utils/Logger");





const addnewMarketingEmp=async(req,res)=>{
    try{
        const {name , contact }=req.body;
       if(!name|| !contact){
        throw new Error("Required fields are missing in the request body");
       }
       
       const nMarketing=new Marketing({
        MarketingName : name,
        contact:contact,
       })

       await nMarketing.save()
       .then((savedData)=>{
        console.log(
           time.tds(),
           req.ip,
           "-/0auth/addnewMarketing--- new Marketing emp  saved successfully "
        );
        res.status(200).json(savedData)
       })
       .catch((savedError)=>{
        console.log(
            time.log(),
            req.ip,
            `-- /0auth/newMarketing--- error saving Markting emp ${savedError.message}`
        );
       })
        
    }
    catch(err){
        console.error(time.tds(), req.ip, ` - /0auth/addblog- ${err.message}`);
         res.status(500).json({ error: err.message });
    }
}

module.exports={
    addnewMarketingEmp,
};