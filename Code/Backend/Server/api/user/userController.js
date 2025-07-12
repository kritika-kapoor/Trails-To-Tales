const commonModel = require("../common/commonModel")
const userModel = require("./userModel")
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
    if(!formData.password){
        validation+=" Password is required"
    }
    if(!formData.phoneNumber){
        validation+=" Phone number is required"
    }
    if(!formData.address){
        validation+=" Address is required"
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
                commonObj.userType = 2
                commonObj.save()

                .then(async (commonData)=>{
                    // insert into user model 

                    let userTotal=await userModel.countDocuments().exec()
                    let userObj=new userModel() 
                    userObj.autoId=userTotal+1 
                    userObj.phoneNumber=formData.phoneNumber
                    userObj.address=formData.address
                    
                    try{
                        let url = await uploadImg(req.file.buffer)
                        console.log(req.file);
                        
                        userObj.userImage = url
                    }
                    catch(err){
                        res.json({
                            status:500,
                            success:false,
                            message:"Error uploading the destination image !!",
                            error:err
                        })
                    }
                    userObj.userId = commonData._id 
                    userObj.save()

                    .then((userData)=>{
                        res.json({
                            status:201,
                            success:true,
                            message:"User registered Successfully!",
                            commonData,
                            userData
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

    userModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
    .populate({
        path:"userId"
    })
    .then(async (userData)=>{
        if(userData.length>0){
            let total = await userModel.countDocuments(formData).exec()
            res.json({
                status:200,
                success:true,
                message:"User Data fetched",
                total:total,
                userData
                
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"users not found"
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
        userModel.findOne({_id:formData._id})
        .populate({
            path:"userId"
        })
        .then((userData)=>{
            if(!userData){
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
                    data:userData
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
        userModel.findOne({_id:formData._id})
        .then(async(userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.phoneNumber){
                    userData.phoneNumber = formData.phoneNumber
                }
                if(!!formData.address){
                    userData.address = formData.address
                }
                if(!!req.file){
                    try{
                        let url = await uploadImg(req.file.buffer)
                        userData.userImage = url
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

                userData.save()
                .then((userData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated",
                        data:userData
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
                    userModel.findOne({userId:commonData._id})
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

module.exports={register, all, single, update,changeStatus}