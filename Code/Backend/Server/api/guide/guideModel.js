const mongoose = require('mongoose')

// defining the guide data schema
let guideSchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    phoneNumber:{type:Number, default:0},
    amountPerDay:{type:Number,default:0},
    guideImage:{type:String, default:"no-pic.jpg"},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"commonModel" , default:null},
    destinationId:{type:mongoose.Schema.Types.ObjectId, ref:"destinationModel" , default:null},
    rating:{type:Number, default:0},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})

module.exports = mongoose.model("guideSchema", guideSchema)