const mongoose = require("mongoose")

const destinationSchema = mongoose.Schema({
    autoId:{type:Number,default:0},
    destinationName:{type:String, default:""},
    destinationImage:[{type:String, default:"no-pic.jpg"}],
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})

module.exports = mongoose.model("destinationModel", destinationSchema)