const { uploadImg } = require("../../utilities/helper")
const galleryModel = require("./galleryModel")


add= async (req,res)=>{
    let total = await galleryModel.countDocuments().exec()
    let validation =""
    
    if(!req.body.albumName){
        validation += "Album name is required"
    }

    if(!req.body.destinationId){
        validation += " Please specify the destination"
    }

    if(req.files?.length<=0){
        validation+= " Please add images to the album"
    }

    if(req.body.isPublic==null || req.body.isPublic==undefined){
        validation+= " Please specify if album is public or private"
    }
    

    if(!validation.trim()){
        await galleryModel.findOne({albumName:req.body.albumName, addedById:req.decoded.userId})
        
        .then(async (galleryData)=>{
            if(!galleryData){
                let galleryObj = new galleryModel()

                galleryObj.autoId = total+1
                galleryObj.destinationId = req.body.destinationId
                galleryObj.albumName = req.body.albumName
                galleryObj.addedById = req.decoded.userId
                galleryObj.isPublic = req.body.isPublic
                try{
                    let imgArr = []
                    for(let i = 0; i<req.files.length;i++){
                    let url = await uploadImg(req.files[i].buffer)
                    await imgArr.push(url)
                    }
                    galleryObj.galleryImages = imgArr
                }
                catch(err){
                    res.json({
                        status:500,
                        success:false,
                        message:"Error uploading the gallery image !!",
                        error:err
                    })
                }
                await galleryObj.save()

                .then((galleryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Album added",
                        galleryData
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
                    message:"Album already exists",
                    galleryData
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

    galleryModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
    .populate({
        path:"destinationId",
        select:"destinationName"
    })
    .populate("addedById")

    .then(async (galleryData)=>{
        if(galleryData.length>0){
            let total = await galleryModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Gallery Data fetched",
                total,
                galleryData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"Albums not found"
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
        galleryModel.findOne({_id:formData._id})
        
        .then((galleryData)=>{
            if(!galleryData){
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
                    data:galleryData
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
        galleryModel.findOne({_id:formData._id})
        .then(async(galleryData)=>{
            if(!galleryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.albumName){
                    galleryData.albumName = formData.albumName
                }

                if(!!formData.destinationId){
                    galleryData.destinationId = formData.destinationId
                }

                if(!!formData.isPublic){
                    galleryData.isPublic = formData.isPublic
                }

                if(req.files.length>0){
                    try{
                        let imgArr = []
                        for(let i = 0 ;i<req.files.length;i++){
                            let url = await uploadImg(req?.files[i]?.buffer)
                            imgArr.push(url)
                        }
                        galleryData.galleryImages = imgArr
                    }
                    catch(err){
                        res.json({
                            status:500,
                            success:false,
                            message:"Error uploading the gallery image !!",
                            error:err
                        })
                    }
                }
                
                await galleryData.save()

                .then((galleryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated",
                        galleryData
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
                message:"Internal Server Error 1"
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
        galleryModel.findOne({_id:formData._id})
        .then((galleryData)=>{
            if(!galleryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                galleryData.status = !galleryData.status
                galleryData.save()
                .then((galleryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated",
                        galleryData
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