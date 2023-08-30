// User Entity/Model

const mongoose = require('mongoose')

module.exports = mongoose.model('User', {
     // Id will be created automatically in the database.. no need to specify it here  
    Username: { type: String , required: true },
    Email: { type: String , required: true},
    Bio: { type: String }, // optional by default
})