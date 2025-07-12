const destinationModel = require("./destinationModel")
const { uploadImg } = require('../../utilities/helper')


add= async (req,res)=>{
    let total = await destinationModel.countDocuments().exec()
    let validation =""
    
    if(!req.body.destinationName){
        validation += "Name is required"
    }
    if(req.files?.length<=0){
        validation+=" Image is required"
    }

    if(!validation.trim()){
        await destinationModel.findOne({destinationName:req.body.destinationName})
        
        .then(async (destinationData)=>{
            if(!destinationData){
                let destinationObj = new destinationModel()

                destinationObj.autoId = total+1
                destinationObj.destinationName = req.body.destinationName
                try{
                    let imgArr = []
                    for(let i = 0 ;i<req.files.length;i++){
                        let url = await uploadImg(req.files[i].buffer)
                        imgArr.push(url)
                    }
                    destinationObj.destinationImage = imgArr
                }
                catch(err){
                    res.json({
                        status:500,
                        success:false,
                        message:"Error uploading the destination image !!",
                        error:err
                    })
                }
                destinationObj.save()

                .then((destinationData)=>{
                    console.log(req.file);
                    
                    res.json({
                        status:200,
                        success:true,
                        message:"destination added",
                        destinationData
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
                    message:"Destination already exists",
                    destinationData
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

    destinationModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)

    .then(async (destinationData)=>{
        if(destinationData.length>0){
            let total = await destinationModel.countDocuments(formData).exec()
            res.json({
                status:200,
                success:true,
                message:"Destination Data fetched",
                total,
                destinationData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"Destination not found"
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
        destinationModel.findOne({_id:formData._id})
        
        .then((destinationData)=>{
            if(!destinationData){
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
                    data:destinationData
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
        destinationModel.findOne({_id:formData._id})
        .then(async(destinationData)=>{
            if(!destinationData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.destinationName){
                    destinationData.destinationName = formData.destinationName
                }
                if(req.files.length>0){
                    try{
                        let imgArr = []
                        for(let i = 0 ;i<req.files.length;i++){
                            let url = await uploadImg(req.files[i].buffer)
                            await imgArr.push(url)
                        }
                        destinationData.destinationImage = imgArr
                    }
                    catch(err){
                        res.json({
                            status:500,
                            success:false,
                            message:"Error uploading the destination image !!",
                            error:err
                        })
                    }
                }
                await destinationData.save()

                .then((destinationData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated",
                        destinationData
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

// Not updating array of images, only single image


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
        destinationModel.findOne({_id:formData._id})
        .then((destinationData)=>{
            if(!destinationData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                destinationData.status = !destinationData.status
                destinationData.save()
                .then((destinationData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated",
                        destinationData
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