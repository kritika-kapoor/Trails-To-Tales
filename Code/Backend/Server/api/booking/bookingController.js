const bookingModel = require("./bookingModel")
const guideModel = require("../guide/guideModel")


add= async (req,res)=>{
    let total = await bookingModel.countDocuments().exec()
    let validation =""
    
    if(!req.body.guideId){
        validation += " Please select a guide"
    }

    if(!req.body.destinationId){
        validation += " Please select a destination"
    }

    if(!req.body.dateOfBooking){
        validation += " Please select a date"
    }

    if(!req.body.numberOfDays){
        validation += " Please select the number of days"
    }

    
    if(!validation.trim()){
        await bookingModel.findOne({guideId:req.body.guideId})
        
        .then(async(bookingData)=>{
            if(!bookingData){
                let bookingObj = new bookingModel()

                bookingObj.autoId = total+1
                bookingObj.guideId = req.body.guideId
                bookingObj.userId = req.decoded.userId
                bookingObj.numberOfDays = req.body.numberOfDays
                bookingObj.destinationId = req.body.destinationId
                bookingObj.dateOfBooking = req.body.dateOfBooking

                
                try{
                    await guideModel.findOne({_id:req.body.guideId})
                    .then(async(guideData)=>{               
                                 
                        if(!guideData){
                            res.json({
                                status:404,
                                success:false,
                                message:"Guide not found !!",
                                err
                            })
                        }
                        else{
                            const cost = await(Number(req.body.numberOfDays) * Number(guideData.amountPerDay))  
                            bookingObj.cost = await cost                                
                            
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
                catch(err){
                    res.json({
                        status:500,
                        success:false,
                        message:"Error fetching the guide data !!",
                        error:err
                    })
                }
                
                await bookingObj.save()

                .then((bookingData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"booking added",
                        bookingData
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
                    message:"Guide already booked",
                    bookingData
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

    bookingModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
    .populate({
        path:"guideId",
        populate:("userId")
    })
    .populate("destinationId", "destinationName")
    .populate("userId", "name")

    .then(async (bookingData)=>{
        if(bookingData.length>0){
            let total = await bookingModel.countDocuments(formData).exec()
            res.json({
                status:200,
                success:true,
                message:"booking Data fetched",
                total,
                bookingData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"booking not found"
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
        bookingModel.findOne({_id:formData._id})
        .populate({
            path:"guideId",
            populate:("userId")
        })
        .populate("destinationId", "destinationName")
        .populate("userId", "name")
        
        .then((bookingData)=>{
            if(!bookingData){
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
                    data:bookingData
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
        bookingModel.findOne({_id:formData._id})
        .then(async(bookingData)=>{
            if(!bookingData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.dateOfBooking){
                    bookingData.dateOfBooking = formData.dateOfBooking
                }

                if(!!formData.numberOfDays){
                    bookingData.numberOfDays = formData.numberOfDays

                    try{
                        await guideModel.findOne({_id:bookingData.guideId})
                        .then(async(guideData)=>{               
                            if(!guideData){
                                res.json({
                                    status:404,
                                    success:false,
                                    message:"Guide not found !!",
                                    err
                                })
                            }
                            else{
                                const cost = await(Number(formData.numberOfDays) * Number(guideData.amountPerDay))  
                                bookingData.cost = await cost                                
                                
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
                    catch(err){
                        res.json({
                            status:500,
                            success:false,
                            message:"Error fetching the guide data !!",
                            error:err
                        })
                    }
                    
                }
                
                await bookingData.save()


                .then((bookingData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated",
                        bookingData
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
        bookingModel.findOne({_id:formData._id})
        .then((bookingData)=>{
            if(!bookingData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(!!formData.status){
                    bookingData.status = formData.status
                }
                bookingData.save()

                .then((bookingData)=>{
                    console.log(bookingData);
                    
                    res.json({
                        status:200,
                        success:true,
                        message:`${formData.status==1?"Booking approved!":formData.status==2?"Booking decined!":"Booking pending!"}`,
                        bookingData
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


module.exports ={add,all,update,single,changeStatus}