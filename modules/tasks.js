const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema({
  task:{
    type:String,
    required:[true,'please enter a task']
  },
  completed:{
    type:Boolean,
    default:false,
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:[true,'please provide a user']
  },
  
},{ timestamps: true })
module.exports=mongoose.model('Task',TaskSchema)