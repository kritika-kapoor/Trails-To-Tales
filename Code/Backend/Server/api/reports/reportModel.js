const mongoose = require("mongoose")

const reportSchema = mongoose.Schema({
    autoId:{type:Number, default:0},
    addedById:{type:mongoose.Schema.Types.ObjectId, ref:"commonModel", default:null},
    reportedAccountId:{type:mongoose.Schema.Types.ObjectId, ref:"commonModel", default:null},
    issue:{type:String, default:""},
    status:{type:Number, default:0},
    // 0= Pending, 1=approved, 2=rejected
    createdAt:{type:Date, default:Date.now()}
})

module.exports = mongoose.model("reportModel", reportSchema)