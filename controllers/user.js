const User=require('../modules/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const login=async(req,res)=>{
  const {email,password}=req.body
  if(!email.trim()||!password.trim()){
    return res.status(404).json({msg:'please provide email and password'})
  }
 
  const user = await User.findOne({email})
if(!user){
  return res.status(404).json({msg:'user not found'})
}
const matchPass= await user.cprPass(password)
if(!matchPass){
  return res.status(404).json({msg:'password incorrect'})
}

const token = user.createToken()
  res.status(202).json({user:{userId:user._id,firstName:user.firstName,lastName:user.lastName},token})
}
const register=async(req,res)=>{
  try {
   const {email}=req.body
   


    // Check if email already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
  
      const user= await User.create({...req.body})
      const token = user.createToken()
 res.status(200).json({user:{userId:user._id,firstName:user.firstName,lastName:user.lastName},token})
  } catch (error) {
    res.status(404).json({error:error.message})
  }

  
}

module.exports={login,register}