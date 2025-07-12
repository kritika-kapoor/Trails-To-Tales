const journalModel = require("./journalModel")

add= async (req,res)=>{
    let total = await journalModel.countDocuments().exec()
    let validation =""
    
    if(!req.body.journalTitle){
        validation += "Journal title is required"
    }

    if(!req.body.destinationId){
        validation += " Please specify the destination"
    }

    if(!req.body.journalDescription){
        validation += " Description is required"
    }
    
    if(!validation.trim()){
        await journalModel.findOne({journalTitle:req.body.journalTitle, addedById:req.decoded.userId})
        
        .then((journalData)=>{
            if(!journalData){
                let journalObj = new journalModel()

                journalObj.autoId = total+1
                journalObj.journalTitle = req.body.journalTitle
                journalObj.journalDescription = req.body.journalDescription
                journalObj.destinationId = req.body.destinationId
                journalObj.addedById = req.decoded.userId
                journalObj.save()

                .then((journalData)=>{                    
                    res.json({
                        status:200,
                        success:true,
                        message:"Journal added",
                        journalData
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
                    message:"Journal already exists with same name",
                    journalData
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

    journalModel.find(formData)
    .populate("destinationId", "destinationName")
    .populate("addedById", "name")
    .limit(limit)
    .skip((currentPage-1)*limit)

    .then(async (journalData)=>{
        if(journalData.length>0){
            let total = await journalModel.countDocuments(formData).exec()
            res.json({
                status:200,
                success:true,
                message:"Journal Data fetched",
                total,
                journalData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"Journal not found"
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
        journalModel.findOne({_id:formData._id})
        .populate("destinationId", "destinationName")
        .populate("addedById", "name")
        
        .then((journalData)=>{
            if(!journalData){
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
                    message:"Data fetched",
                    data:journalData
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
        journalModel.findOne({_id:formData._id})
        .then(async(journalData)=>{
            if(!journalData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.journalTitle){
                    journalData.journalTitle = formData.journalTitle
                }
                if(!!formData.destinationId){
                    journalData.destinationId = formData.destinationId
                }
                if(!!formData.journalDescription){
                    journalData.journalDescription = formData.journalDescription
                }
                
                journalData.save()

                .then((journalData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated",
                        journalData
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
        journalModel.findOne({_id:formData._id})
        .then((journalData)=>{
            if(!journalData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                journalData.status = !journalData.status
                journalData.save()
                .then((journalData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated",
                        journalData
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