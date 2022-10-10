const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Task = require('../models/Task')
const { body, validationResult } = require('express-validator');

//Fetchinf all the the tasks. Login Required
router.get('/fetchalltasks', fetchuser, async(req, res)=>{
    try {
        const tasks = await Task.find({ user: req.user });
        res.json({tasks})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

// ROUTE 2: Add a new classNtaskame using: POST "/api/classNtaskames/addclassNtaskame". Login required
router.post('/addtask', fetchuser, [
    body('taskdesc', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { taskdesc, tasktype, taskst, tasktimetaken } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const task = new Task({
                taskdesc, tasktype, taskst, tasktimetaken, user: req.user.id
            })
            const savedTask = await task.save()

            res.json(savedTask)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })



// ROUTE 3: Update an existing task using: PUT "/api/tasks/updatetask". Login required
router.put('/updatetask/:id', fetchuser, async (req, res) => {
    const { taskdesc, tasktype, taskst } = req.body;
    try {
        // Create a newtask object
        const newTask = {};
        if (taskdesc) { newTask.taskdesc = taskdesc };
        if (tasktype) { newTask.tasktype = tasktype };
        if (taskst) { newTask.taskst = taskst };

        // Find the task to be updated and update it
        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
        res.json({ task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 4: Delete an existing task using: DELETE "/api/tasks/deletetask". Login required
router.delete('/deletetask/:id', fetchuser, async (req, res) => {
    try {
        // Find the task to be delete and delete it
        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        task = await Task.findByIdAndDelete(req.params.id)
        res.json({ "Success": "task has been deleted", task: task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
 
module.exports = router;