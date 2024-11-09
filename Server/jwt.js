const {sign,verify}=require("jsonwebtoken");
const { model } = require("mongoose");

const createTokens=(user)=>{
    const token=sign({
        username:user.name,id:user.id
    },"jwtKarimSecretIds")
    return token
}

const validateToken=(req,res,next)=>{
    // const accessToken=req.cookies["access-token"]
    let accessToken=req.get("Authorization").split(" ")[1];
    
    // const accessToken=req.params.token
    if(accessToken === "notAuthenticated"){
      return  res.status(400).json({error:"User Not Authenticated"})
    }
    try{
        const validToken=verify(accessToken,"jwtKarimSecretIds")
        if(validToken){
           req.authenticated=true 
           return next();
        }
    }catch(err){
        return res.status(400).json({error:err})
    }
}
module.exports={createTokens,validateToken}