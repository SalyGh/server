const express = require("express");
const app = express(); 
const port = 3001 ; 


// local imports 
const connect = require('./db.connection..js'); 
const usersRoutes = require('./Controllers/users.controller.js')


app.use(express.json());




app.use('/api/users', usersRoutes)



// after establishing the connection with the database, we are going to connect to the server
connect().then(()=>{ 
    console.log("Database connected successfully");
    app.listen(port , ()=>{
        console.log("Server is Working :)")}); 
}).catch(err=> console.log(err))