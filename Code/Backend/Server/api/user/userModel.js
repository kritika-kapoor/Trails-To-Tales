const mongoose = require('mongoose')

// defining the user data schema
let userSchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    phoneNumber:{type:Number, default:0},
    address:{type:String,default:""},
    userImage:{type:String, default:""},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"commonModel" , default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})

module.exports = mongoose.model("userSchema", userSchema)