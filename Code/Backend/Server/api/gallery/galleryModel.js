const mongoose = require("mongoose")

const gallerySchema = mongoose.Schema({
    autoId:{type:Number, default:0},
    destinationId:{type:mongoose.Schema.ObjectId, ref:"destinationModel", default:null},
    albumName:{type:String, default:""},
    galleryImages:[{type:String, default:"no-pic.jpg"}],
    addedById:{type:mongoose.Schema.ObjectId, ref:"commonModel", default:null},
    isPublic:{type:Boolean, default:false},
    likes:{type:Number, default:0},
    visits:{type:Number, default:0},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})

module.exports = mongoose.model("galleryModel", gallerySchema)