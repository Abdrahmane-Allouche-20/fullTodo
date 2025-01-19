const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
require("dotenv").config()
const UserSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:[true,'please provide  fullname']
  },
  lastName:{
    type:String,
    required:[true,'please provide  fullname']
  },
  email:{
    type:String,
    required:[true,'please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return; // Only hash if password is modified
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
});
UserSchema.methods.createToken = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }
  return jwt.sign(
    { userId: this._id, firstName: this.firstName, lastName: this.lastName },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};
UserSchema.methods.cprPass = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
module.exports=mongoose.model('User',UserSchema)