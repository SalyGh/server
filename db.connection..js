// Establishing the connection to mongo db

const mongoose = require("mongoose"); 
const dbConnection = "mongodb+srv://admin:1234@cluster0.u8rva7g.mongodb.net/users_db?retryWrites=true&w=majority"; 

module.exports = ()=>{
    return mongoose.connect(dbConnection)
}