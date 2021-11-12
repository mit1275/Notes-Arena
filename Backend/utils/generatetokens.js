const jwt=require('jsonwebtoken');

const generate=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"20d",
    });
};
module.exports=generate;