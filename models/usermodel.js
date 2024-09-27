
let mongoose = require('mongoose')

let userschema = mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique: true
    },
    password: {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student" 
    }
},{ timestamps: true })

let usermodel = mongoose.model('Users', userschema)

module.exports = usermodel
