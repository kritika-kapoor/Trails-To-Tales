const userModel = require("../user/userModel")
const guideModel = require("../guide/guideModel")
const destinationModel = require("../destinations/destinationModel")
const adsModel = require("../advertisements/adsModel")
const reportsModel = require("../reports/reportModel")
const journalModel = require("../journals/journalModel")
const galleryModel = require("../gallery/galleryModel")

dashboard = async (req,res)=>{
    try{
        let userTotal = await userModel.countDocuments().exec()
        let userActiveTotal = await userModel.countDocuments({status:true}).exec()
        let userInactiveTotal = await userModel.countDocuments({status:false}).exec()

        let guideTotal = await guideModel.countDocuments().exec()
        let guideActiveTotal = await guideModel.countDocuments({status:true}).exec()
        let guideInactiveTotal = await guideModel.countDocuments({status:false}).exec()

        let destinationTotal = await destinationModel.countDocuments().exec()
        let destinationActiveTotal = await destinationModel.countDocuments({status:true}).exec()
        let destinationInactiveTotal = await destinationModel.countDocuments({status:false}).exec()

        let adsTotal = await adsModel.countDocuments().exec()
        let adsActiveTotal = await adsModel.countDocuments({status:true}).exec()
        let adsInactiveTotal = await adsModel.countDocuments({status:false}).exec()

        let reportsTotal = await reportsModel.countDocuments().exec()
        let reportsActiveTotal = await reportsModel.countDocuments({status:true}).exec()
        let reportsInactiveTotal = await reportsModel.countDocuments({status:false}).exec()

        let journalTotal = await journalModel.countDocuments().exec()
        let journalActiveTotal = await journalModel.countDocuments({status:true}).exec()

        let galleryTotal = await galleryModel.countDocuments().exec()
        let galleryActiveTotal = await galleryModel.countDocuments({status:true}).exec()

        res.json({
            status:200,
            success:true,
            message:"Data Fetched Successfully !!",
            userData : {
                TotalUsers: userTotal,
                Active : userActiveTotal,
                Inactive: userInactiveTotal
            },
            guideData : {
                TotalGuides: guideTotal,    
                Active : guideActiveTotal,
                Inactive: guideInactiveTotal
            },
            destinationData : {
                Totaldestinations: destinationTotal,
                Active : destinationActiveTotal,
                Inactive: destinationInactiveTotal
            },
            advertisementsData : {
                Totalads: adsTotal,
                Active : adsActiveTotal,
                Inactive: adsInactiveTotal
            },
            reportsData : {
                Totalreports: reportsTotal,
                Active : reportsActiveTotal,
                Inactive: reportsInactiveTotal
            },
            journalData:{
                journalTotal,
                journalActiveTotal
            },
            galleryData:{
                galleryTotal,
                galleryActiveTotal
            }
        })
    }
    catch(err){
        res.json({
            status:500,
            success:false,
            message:"Internal Server Error !!"
        })
    }
}

module.exports = {dashboard}