const reportModel = require("./reportModel")

add= async (req,res)=>{
    let total = await reportModel.countDocuments().exec()
    let validation = ""

    if(!req.body.reportedAccountId){
        validation += "Specify the account to be reported."
    }

    if(!req.body.issue){
        validation += " Please mention the issue."
    }

    if(!validation.trim()){
        // To check duplicates
        await reportModel.findOne({reportedAccountId:req.body.reportedAccountId})
    
        .then((reportData)=>{
        if(!reportData){
            // obj for accessing the schema
            let reportObj = new reportModel()

            // adding the values from queries
            reportObj.autoId = total+1
            reportObj.addedById = req.decoded.userId
            reportObj.reportedAccountId = req.body.reportedAccountId
            reportObj.issue = req.body.issue
            reportObj.save()

            .then((reportData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Account reported !!",
                    reportData
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
                message:"Account has already been reported !",
                reportData
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
    let limit = formData.limit
    let currentPage = formData.currentPage

    delete formData.limit
    delete formData.currentPage

    reportModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
    .populate("reportedAccountId")
    .populate("addedById", "name")

    .then(async (reportData)=>{
        if(reportData.length>0){
            let total = await reportModel.countDocuments(formData).exec()
            res.json({
                status:200,
                success:true,
                message:"Report Data fetched",
                total:total,
                data:reportData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"Report not found"
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
        reportModel.findOne({_id:formData._id})
        .populate("reportedAccountId")
        .populate("addedById", "name")
        
        .then((reportData)=>{
            if(!reportData){
                res.json({
                    status:404,
                    success:false,
                    message:"No report found"
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Report fetched",
                    reportData
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
        reportModel.findOne({_id:formData._id})
        .then((reportData)=>{
            if(!reportData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.status){
                    reportData.status = formData.status
                }
                reportData.save()
                .then((reportData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated",
                        reportData
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


module.exports = {add,all,single,changeStatus}