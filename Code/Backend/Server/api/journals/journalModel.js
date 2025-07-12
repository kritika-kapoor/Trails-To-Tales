const mongoose = require("mongoose")

const journalSchema = mongoose.Schema({
    autoId:{type:Number, default:0},
    journalTitle:{type:String, default:""},
    destinationId:{type:mongoose.Schema.Types.ObjectId, ref:"destinationModel", default:null},
    journalDescription:{type:String, default:""},
    addedById:{type:mongoose.Schema.Types.ObjectId ,ref:"commonModel", default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})

module.exports = mongoose.model("journalModel", journalSchema)