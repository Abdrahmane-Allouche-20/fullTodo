const express=require('express')
const app=express()
const Connect=require('./database/connect')
require('dotenv').config()
const UserRoute=require("./routes/user")
const tasksRoute=require('./routes/tasks')
const cors=require('cors')
const auth =require('./middlewares/authentication')
app.use(express.json())
app.use(cors());
app.use('/api/v1/user',UserRoute)
app.use('/api/v1/task',auth,tasksRoute)
app.get('/',(req,res)=>{
  res.status(202).send('welcome')
})
const Start=async()=>{
const Port=process.env.PORT||4000
  try {
    await Connect(process.env.MONGO_URI)
    app.listen(Port,()=>{console.log(`server listening on ${Port}`)})
  } catch (error) {
    console.log(error.message)
  }
}

Start()