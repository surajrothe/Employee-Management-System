const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({

    taskdesc: {
        type: String,
        required: true,
    },
    tasktype: {
        type: String,
        // required: true
    },
    taskst:{
        type: Date,
        default: Date.now
    },
    tasktimetaken:{
        type: String,
        // required: true,
    }

 
});

module.exports = mongoose.model('task', TaskSchema)