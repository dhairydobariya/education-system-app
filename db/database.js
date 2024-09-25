let mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log("database succesfully conect expences-app")
    
}).catch((err) => {
        console.log("database connection error")
})