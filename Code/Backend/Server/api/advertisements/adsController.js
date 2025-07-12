const adsModel = require("./adsModel")
const { uploadImg } = require('../../utilities/helper')



add= async (req,res)=>{
    let total = await adsModel.countDocuments().exec()
    let validation =""
    let formData = req.body
    
    if(!formData.adsName){
        validation += "Name is required"
    }

    if(!formData.duration){
        validation += "Duration is required"
    }

    if(!formData.description){
        validation += " Description is required"
    }

    if(!req.file){
        validation+=" Image is required"
    }

    if(!validation.trim()){
        await adsModel.findOne({adsName:formData.adsName})
        
        .then(async (adsData)=>{
            if(!adsData){
                let adsObj = new adsModel()

                adsObj.autoId = total+1
                adsObj.adsName = formData.adsName
                adsObj.addedById = req.decoded.userId
                adsObj.duration = formData.duration
                adsObj.cost = (formData.duration * 500)
                adsObj.description = formData.description
                try{
                    let url = await uploadImg(req.file.buffer)
                    adsObj.adsImage = url
                }
                catch(err){
                    res.json({
                        status:500,
                        success:false,
                        message:"Error uploading the ads image !!",
                        error:err
                    })
                }
                adsObj.save()

                .then((adsData)=>{
                    console.log(req.file);
                    
                    res.json({
                        status:200,
                        success:true,
                        message:"ads added",
                        adsData
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
                    message:"Advertisement already exists",
                    adsData
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

    adsModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
    .populate("addedById")

    .then(async (adsData)=>{
        if(adsData.length>0){
            let total = await adsModel.countDocuments(formData).exec()
            res.json({
                status:200,
                success:true,
                message:"Advertisement Data fetched",
                total,
                adsData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"Advertisement not found"
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
        adsModel.findOne({_id:formData._id})
        
        .then((adsData)=>{
            if(!adsData){
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
                    data:adsData
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
        adsModel.findOne({_id:formData._id})
        .then((adsData)=>{
            if(!adsData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.status){
                    adsData.status = formData.status
                }
                
                adsData.save()
                .then((adsData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:`${formData.status==1?"Advetisement approved!":formData.status==2?"Advetisement decined!":"Advetisement pending!"}`,
                        adsData
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


module.exports ={add,all,single,changeStatus}           