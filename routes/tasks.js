const router=require('express').Router()
const {GetAlltasks,CreateTask,SingleTask,UpdateTask,DeleteTask}=require('../controllers/task')
router.route('/').get(GetAlltasks).post(CreateTask)
router.route('/:id').get(SingleTask).delete(DeleteTask).patch(UpdateTask)

module.exports=router