const jwt = require("jsonwebtoken");
const student=require("../model/Student");
const expressAsyncHandler = require("express-async-handler");

const auth=async(req,res,next)=>{

  try{

    const token=req.cookies.jwt;
    const verify=jwt.verify(token,"1234567uyasdfgghhjjkxvcbvbnmn567fhgjh234567556677");
    console.log(verify);
    next();
  }catch(error){
    res.status(401).send(error);
    console.log("Error in auth "+error);
  }
}
module.exports=auth;


