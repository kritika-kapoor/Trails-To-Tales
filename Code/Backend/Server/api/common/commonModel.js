const mongoose = require('mongoose')

// defining the common data schema
let commonSchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    name:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    userType:{type:Number,default:2},
    // 1 -> admin , 2 -> user , 3 -> guide 
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})

module.exports = mongoose.model("commonModel", commonSchema)