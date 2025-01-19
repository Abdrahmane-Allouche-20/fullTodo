const Task=require('../modules/tasks')
const CreateTask=async(req,res)=>{
  req.body.createdBy=req.user.userId
  const task=await Task.create({...req.body})
  
  res.status(200).json({tasks:task,nbTasks:task.length})
}
const GetAlltasks=async(req,res)=>{
const task=await Task.find({createdBy:req.user.userId}).sort('createdAt')
if(!task){
  return res.status(404).json({msg:'task not found'})
}
res.status(202).json({tasks:task,nbTask:task.length})

}
const SingleTask=async(req,res)=>{
  const {user:{userId},params:{id:taskId}}=req
  const task=await Task.findOne({_id:taskId,createdBy:userId})
  if(!task){
    return res.status(404).json({msg:'tasks not found'})
  }
  res.status(202).json({tasks:task})
}
const UpdateTask=async(req,res)=>{
  const {user:{userId},params:{id:taskId}}=req
  const task=await Task.findOneAndUpdate({createdBy:userId,_id:taskId},req.body,{ new: true, runValidators: true })
  if(!task){
    return res.status(404).json({msg:'task not found'})
  }

  res.status(200).json({msg:'Task Updated',task:task})
}
const DeleteTask=async(req,res)=>{
  const {user:{userId},params:{id:taskId}}=req
  const task=await Task.findOneAndDelete({createdBy:userId,_id:taskId})
  if(!task){
    return res.status(404).json({msg:'task not found'})
  }

  res.status(200).json({msg:'Task deleted'})
}
module.exports={GetAlltasks,CreateTask,SingleTask,UpdateTask,DeleteTask}