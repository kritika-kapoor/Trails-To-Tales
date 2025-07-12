const ratingModel = require("./ratingModel")
const guideModel = require("../guide/guideModel")

add=async(req,res)=>{
    let validation = ""
    let formData = req.body
    let total =await ratingModel.countDocuments().exec()

    if(!formData.guideId){
        validation+= "Please mention a guide"
    }

    if(!formData.addedRating){
        validation+= " Please enter a rating"
    }

    if(formData.addedRating<0 || formData.addedRating>5){
        validation+= " Please enter a valid rating between 0 and 5"
    }

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }

    else{
        await guideModel.findOne({_id:formData.guideId})
        .then(async(guideData)=>{
            if(!guideData){
                res.json({
                    status:404,
                    success:false,
                    message:"No guide found !"
                })
            }

            else{
                    await ratingModel.findOne({addedById:req.decoded.userId, guideId:formData.guideId})
                    .then((checkData)=>{
                        if(!!checkData){
                            res.json({
                                status:200,
                                success:false,
                                message:"You have already reviewed this guide !!"
                            })
                        }
                    
                        else{


                        let ratingObj = new ratingModel()
                        ratingObj.autoId = total+1
                        ratingObj.guideId = formData.guideId
                        ratingObj.addedById = req.decoded.userId

                        if(!!formData.review){
                            ratingObj.review = formData.review
                        }
                        ratingObj.rating = Number(formData.addedRating)
                        ratingObj.save()

                        .then((ratingData)=>{
                           ratingModel.find({guideId:formData.guideId})
                           
                           .then((guideRatingData)=>{
                                let totalRating=0
                                let count=0
                                for(let i=0;i<guideRatingData?.length;i++){
                                    totalRating+=Number(guideRatingData[i]?.rating)
                                    count++;
                                }
                                let avgRating=(totalRating/count).toFixed(1)
                            
                                
                                guideData.rating=Number(avgRating) 
                                guideData.save()

                                .then((guideData)=>{
                                    res.json({
                                        status:200,
                                        success:true,
                                        message:"Rating added",
                                        ratingData,
                                        guideData
                                    })
                                })
                                .catch((err)=>{
                                    res.json({
                                        status:500,
                                        success:false,
                                        message:"Internal server error !!",
                                        err
                                    })
                                })
                            })
                        
                           .catch((err)=>{
                            res.json({
                                status:500,
                                success:false,
                                message:"Internal server error !!",
                                err
                            })
                        })
                
                        })
        
                        .catch((err)=>{
                            res.json({
                                status:500,
                                success:false,
                                message:"Internal server error !!",
                                err
                            })
                        })
                        }
                    
                    })
                
                        .catch((err)=>{
                            res.json({
                                status:500,
                                success:false,
                                message:"Internal server error !!",
                                err
                            })
                        })
              
            }
        })

        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error !!",
                err
            })
        })
    }
}

all=(req,res)=>{
    let formData = req.body

    ratingModel.find(formData)
    .populate("addedById")
    .then(async (ratingData)=>{
        if(ratingData.length>0){
            let total = await ratingModel.countDocuments(formData).exec()
            res.json({
                status:200,
                success:true,
                message:"rating Data fetched",
                total:total,
                data:ratingData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"rating not found"
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


module.exports = {add,all}