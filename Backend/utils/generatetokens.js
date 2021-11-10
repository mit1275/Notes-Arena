const jwt=require('jsonwebtoken');

const generate=(id)=>{
    return jwt.sign({id},"1234567uyasdfgghhjjkxvcbvbnmn567fhgjh234567556677",{
        expiresIn:"20d",
    });
};
module.exports=generate;