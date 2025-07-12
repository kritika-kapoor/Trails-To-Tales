const commonModel = require("../common/commonModel")
const guideModel = require("./guideModel")
const { uploadImg } = require('../../utilities/helper')


// To encrypt password in database
const bcryptjs=require("bcryptjs")

register=(req,res)=>{

    let validation=""
    let formData=req.body 

    if(!formData.name){
        validation+="Name is required"
    }
    if(!formData.email){
        validation+=" Email is required"
    }

    if(!formData.destinationId){
        validation+= " Please enter the destination"
    }

    if(!formData.password){
        validation+=" Password is required"
    }
    if(!formData.phoneNumber){
        validation+=" Phone number is required"
    }
    if(!formData.amountPerDay){
        validation+=" Amount/Day is required"
    }

    if(!req.file){
        validation+= " Profile Picture is required"
    }
    

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    
    else{
        commonModel.findOne({email:formData.email})
        .then(async (commonData)=>{
            if(!commonData){
                //insert in commonModel first 
                let commonTotal=await commonModel.countDocuments().exec()
                let commonObj=new commonModel()
                commonObj.autoId = commonTotal+1
                commonObj.name=formData.name 
                commonObj.email=formData.email 
                commonObj.password=bcryptjs.hashSync(formData.password,10) 
                commonObj.userType = 3
                commonObj.save()

                .then(async (commonData)=>{
                    // insert into user model 

                    let guideTotal=await guideModel.countDocuments().exec()
                    let guideObj=new guideModel() 
                    guideObj.autoId=guideTotal+1 
                    guideObj.phoneNumber=formData.phoneNumber
                    guideObj.destinationId = formData.destinationId
                    guideObj.amountPerDay=formData.amountPerDay

                    try{
                        let url = await uploadImg(req.file.buffer)
                        guideObj.guideImage = url
                        }
                    catch(err){
                        res.json({
                            status:500,
                            success:false,
                            message:"Error uploading the destination image !!",
                            error:err
                            })
                        }

                    guideObj.userId = commonData._id 
                    guideObj.save()
                    .then((guideData)=>{
                        res.json({
                            status:201,
                            success:true,
                            message:"Guide registered Successfully!",
                            commonData,
                            guideData
                        })
                    })
                    .catch((err)=>{
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error!!"
                        })
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error!!"
                    })
                })
            }
            
            else{
                res.json({
                    status:200,
                    success:false,
                    message:"User already exist",
                    data:commonData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
    }
}

all=(req,res)=>{
    let formData = req.body
    let limit = formData?.limit
    let currentPage = formData?.currentPage
    

    delete formData?.limit
    delete formData?.currentPage

    guideModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
    .populate({
        path:"userId"
    })
    .populate("destinationId", "destinationName")
    .then(async (guideData)=>{
        if(guideData.length>0){
            let total = await guideModel.countDocuments(formData).exec()
            res.json({
                status:200,
                success:true,
                message:"Guide Data fetched",
                total:total,
                guideData
                
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"Guides not found"
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
        guideModel.findOne({_id:formData._id})
        .populate({
            path:"userId"
        })
        .populate("destinationId", "destinationName")
        .then((guideData)=>{
            if(!guideData){
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
                    guideData
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
        guideModel.findOne({_id:formData._id})
        .then(async(guideData)=>{
            if(!guideData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.phoneNumber){
                    guideData.phoneNumber = formData.phoneNumber
                }
                if(!!formData.amountPerDay){
                    guideData.amountPerDay = formData.amountPerDay
                }
                if(!!formData.destinationId){
                    guideData.destinationId = formData.destinationId
                }
                if(!!req.file){
                    try{
                        let url = await uploadImg(req.file.buffer)
                        guideData.guideImage = url
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

                guideData.save()
                .then((guideData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated",
                        guideData
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
        commonModel.findOne({_id:formData._id})
        .then((commonData)=>{
            if(!commonData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                commonData.status = !commonData.status
                commonData.save()
                .then((commonData)=>{
                    guideModel.findOne({userId:commonData._id})
                    .then((userData=>{
                        userData.status = !userData.status
                        userData.save()
                        res.json({
                            status:200,
                            success:true,
                            message:"Status updated !!",
                            userData,
                            commonData
                        })
                    }))
                    .catch((err)=>{
                        res.json({
                            status:422,
                            success:false,
                            message:"Internal Server error"
                        })
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


module.exports={register, all, single, update, changeStatus}