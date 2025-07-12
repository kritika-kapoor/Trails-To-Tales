let commonModel = require("./commonModel")
let userModel = require("../user/userModel")
let bcryptjs = require("bcryptjs")

const jwt = require("jsonwebtoken")
const SECRET = "MyProject@123"

login = async(req,res)=>{
    let validation = ""
    let formData = req.body

    if(!formData.email){
        validation+="Email is required"
    }
    if(!formData.password){
        validation+=" Password is required"
    }

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }

    else{
        await commonModel.findOne({email:formData.email})
        .then(async(commonData)=>{
            if(!commonData){
                res.json({
                    status:404,
                    success:false,
                    message:"User does not exist !!"
                })
            }

            else{

                if(commonData.status==false){
                    res.json({
                        status:403,
                        success:false,
                        message:"You account has been temporarily suspended !"
                    })
                }

                else{
                    await userModel.findOne({userId:commonData?._id})
                    .then((userData)=>{

                    let result = bcryptjs.compareSync(formData.password,commonData.password)
                    if(result){
                        let payload = {
                            userId : commonData._id,
                            email: commonData.email,
                            name: commonData.name,
                            userType: commonData.userType
                        }

                        let token = jwt.sign(payload, SECRET, {expiresIn:"24h"})
                        res.json({
                            status:200,
                            success:true,
                            message:"Login Successfully",
                            token,
                            commonData,
                            userData
                        })
                    }
                    else{
                        res.json({
                            status:200,
                            success:false,
                            message:"Invalid Credentials"
                        })
                    }   
            })
            .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err
            })
        })
                    

                }
                
                
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err
            })
        })
    }
}

changePassword = (req,res)=>{
    let validation = ""
    let formData = req.body

    if(!formData.oldPassword){
        validation+= "Old password is missing"
    }

    if(!formData.newPassword){
        validation+= " New password is missing"
    }

    if(!formData.confirmPassword){
        validation+= " Confirm password is missing"
    }

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }

    else{
        if(formData.newPassword===formData.confirmPassword){
            commonModel.findOne({_id:req.decoded.userId})
            .then((commonData)=>{
                let result = bcryptjs.compareSync(formData.oldPassword,commonData.password)

                if(result){
                    commonData.password = bcryptjs.hashSync(formData.newPassword,10)
                    commonData.save()

                    .then((newData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Password changed successfully !!",
                            newData
                        })
                    })
                    .catch((err)=>{
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal Server Error !!",
                            error:err
                        })
                    })
                }
                else{
                    res.json({
                        status:404,
                        success:false,
                        message:"Incorrect password entered !!"
                    })
                }
            })
            .catch((err)=>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal Server Error !!",
                    error:err
                })
            })
        }
        else{
            res.json({
                status:200,
                success:false,
                message:"New and confirm password does not match !!"
            })
        }
    }
}

module.exports = {login, changePassword}