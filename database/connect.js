const mongoose=require('mongoose')
const Connect=(URI)=>{

  return mongoose.connect(URI).then(()=>{console.log("connected to database")}).catch((error)=>{console.log(error.message)})
}

module.exports=Connect