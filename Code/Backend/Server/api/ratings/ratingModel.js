const mongoose = require("mongoose")

const ratingSchema = mongoose.Schema({
    autoId:{type:Number, default:0},
    addedById:{type:mongoose.Schema.Types.ObjectId, def:null, ref:"commonModel"},
    guideId:{type:mongoose.Schema.Types.ObjectId, def:null, ref:"guideModel"},
    rating:{type:Number, default:0},
    review:{type:String, default:""},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})

//autoId, addedById, guideId, rating, review, status, createdAt
module.exports = mongoose.model("ratingModel", ratingSchema)