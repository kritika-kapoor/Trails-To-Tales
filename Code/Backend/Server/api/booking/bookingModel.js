const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    autoId:{type:Number, default:0},
    guideId:{type:mongoose.Schema.Types.ObjectId, ref:"guideSchema", default:null},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"commonModel", default:null},
    destinationId:{type:mongoose.Schema.Types.ObjectId, ref:"destinationModel", default:null},
    dateOfBooking:{type:String, default:""},
    numberOfDays:{type:Number, default:0},
    cost:{type:Number, default:0},
    status:{type:Number, default:0},
    // 0=> pending , 1 => approved , 2 => declined
    createdAt:{type:Date, default:Date.now()}
})

module.exports = mongoose.model("bookingModel", bookingSchema)