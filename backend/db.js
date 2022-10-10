const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/employee"

const ConnectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected To Database Successfully");

    })
}

module.exports = ConnectToMongo;

