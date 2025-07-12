const toDoModel = require("./toDoModel")

add= async (req,res)=>{
    let total = await toDoModel.countDocuments().exec()
    let validation =""
    
    if(!req.body.title){
        validation += "Title is required."
    }

    // if((req.body.tasks).length<=0){
    //     validation += " Please enter tasks."
    // }

    
    if(!validation.trim()){
        await toDoModel.findOne({title:req.body.title})
        
        .then((toDoData)=>{
            if(!toDoData){
                let toDoObj = new toDoModel()

                toDoObj.autoId = total+1
                toDoObj.userId = req.decoded.userId
                toDoObj.title = req.body.title
                toDoObj.description = req.body.description
                toDoObj.tasks = req.body.tasks

                toDoObj.save()

                .then((toDoData)=>{                    
                    res.json({
                        status:200,
                        success:true,
                        message:"toDo added",
                        toDoData
                    })
                })

                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:'Internal Server error',
                        error:err
                    })
                })

            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"List already exists with same name",
                    toDoData
                })
            }
        })

        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!",
                error:err
            })
        })
    }

    else{
        res.json({
            status:422,
            success:false,
            message:validation
        })
    } 
}


all=(req,res)=>{
    let formData = req.body
    let limit = formData?.limit
    let currentPage = formData?.currentPage

    delete formData?.limit
    delete formData?.currentPage

    toDoModel.find(formData)
    .populate("userId", "name")
    .limit(limit)
    .skip((currentPage-1)*limit)

    .then(async (toDoData)=>{
        if(toDoData.length>0){
            let total = await toDoModel.countDocuments(formData).exec()
            res.json({
                status:200,
                success:true,
                message:"Lists fetched",
                total,
                toDoData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"Lists not found"
            })
        }
        
    })

    .catch(()=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error"
        })
    })   
}


single=(req,res)=>{
    let validation = ""
    let formData = req.body
    if(!formData._id){
        validation+= "_id is required"
    }

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        toDoModel.findOne({_id:formData._id})
        .populate("userId", "name")
        
        .then((toDoData)=>{
            if(!toDoData){
                res.json({
                    status:404,
                    success:false,
                    message:"No data found"
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"List fetched",
                    toDoData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:422,
                success:false,
                message:"Internal server error",
                error:err
            })
        })
    }
}


update=(req,res)=>{
    let formData = req.body
    let validation = ""
    if(!formData._id){
        validation+="_id is required"
    }

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        toDoModel.findOne({_id:formData._id})
        .then(async(toDoData)=>{
            if(!toDoData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.title){
                    toDoData.title = formData.title
                }
                
                if(!!formData.description){
                    toDoData.description = formData.description
                }

                if(!!formData.tasks){
                    toDoData.tasks = formData.tasks
                }
                
                toDoData.save()

                .then((toDoData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated",
                        toDoData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:422,
                        success:false,
                        message:"Internal Server error"
                    })
                })
            }
        })

        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal Server Error"
            })
        })
    }
}


changeStatus=(req,res)=>{
    let formData = req.body
    let validation = ""
    if(!formData._id){
        validation+="_id is required"
    }

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        toDoModel.findOne({_id:formData._id})
        .then((toDoData)=>{
            if(!toDoData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                toDoData.status = !toDoData.status
                toDoData.save()
                .then((toDoData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated",
                        toDoData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:422,
                        success:false,
                        message:"Internal Server error"
                    })
                })
            }
        })

        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal Server Error"
            })
        })
    }
}

module.exports ={add,all,single,update,changeStatus}