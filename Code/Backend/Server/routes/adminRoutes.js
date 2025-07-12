const router = require("express").Router()
const multer = require("multer")

const destinationController = require("../api/destinations/destinationController")
const bookingController = require("../api/booking/bookingController")
const adsController = require("../api/advertisements/adsController")
const galleryController = require("../api/gallery/galleryController")
const dashboardController = require("../api/dashboard/dashboardController")
const reportController = require("../api/reports/reportController")


// To provide access to api's only after login
router.use(require("../middleware/adminTokenChecker"))


// Destination image multer code
const destinationStorage = multer.memoryStorage()
const destinationUpload = multer({ storage: destinationStorage })


// Destination Api's
router.post("/add/destination", destinationUpload.array("destinationImage",5) , destinationController.add)
router.post("/update/destination", destinationUpload.array("destinationImage") , destinationController.update)
router.post("/changeStatus/destination", destinationController.changeStatus)


// Booking Api's
router.post("/changeStatus/booking" , bookingController.changeStatus)


// Ads Api's
router.post("/changeStatus/ads" , adsController.changeStatus)


// Gallery Api's
router.post("/changeStatus/gallery" , galleryController.changeStatus)


// Dashboard Api
router.post("/dashboard", dashboardController.dashboard)


// Report Api's
router.post("/all/reports", reportController.all)
router.post("/changeStatus/report", reportController.changeStatus)




module.exports = router