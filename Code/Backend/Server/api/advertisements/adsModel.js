const mongoose = require("mongoose")

const adsSchema = mongoose.Schema({
    autoId:{type:Number, default:0},
    addedById:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"commonModel"},
    adsName:{type:String, default:""},
    duration:{type:Number, default:1},
    cost:{type:Number, default:0},
    description:{type:String, default:""},
    adsImage:{type:String, default:"no-pic.jpg"},
    status:{type:Number, default:0},
    // 0=> pending , 1 => approved , 2 => declined
    createdAt:{type:Date, default:Date.now()}
})

module.exports = mongoose.model("adsModel", adsSchema)