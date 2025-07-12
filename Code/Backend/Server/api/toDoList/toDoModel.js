const mongoose = require('mongoose')

// defining the toDo data schema
let toDoSchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"commonModel", default:null},
    title:{type:String, default:""},
    description:{type:String,default:""},
    tasks:[{type:String, default:""}],
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})

module.exports = mongoose.model("toDoModel", toDoSchema)