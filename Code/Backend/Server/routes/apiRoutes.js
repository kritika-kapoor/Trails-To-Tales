const router = require("express").Router()
const userController = require("../api/user/userController")
const commonController = require("../api/common/commonController")
const guideController = require("../api/guide/guideController")
const destinationController = require("../api/destinations/destinationController")
const journalController = require("../api/journals/journalController")
const bookingController = require("../api/booking/bookingController")
const adsController = require("../api/advertisements/adsController")
const galleryController = require("../api/gallery/galleryController")
const reportController = require("../api/reports/reportController")
const ratingController = require("../api/ratings/ratingController")
const contactController = require("../api/Contact/contactController")
const multer = require("multer")


// User image multer code
const userStorage = multer.memoryStorage()
const userUpload = multer({ storage: userStorage })


// guide image multer code
const guideStorage = multer.memoryStorage()
const guideUpload = multer({ storage: guideStorage })


// login
router.post("/login", commonController.login)


// User registeration
router.post("/user/register",userUpload.single("userImage") , userController.register)

// Contact api
router.post('/contact',contactController.contact),

// Destination api
router.post("/all/destination", destinationController.all)


// To provide access to api's only after login
router.use(require("../middleware/tokenChecker"))


// change password
router.post("/changePassword", commonController.changePassword)


// User api's
router.post("/all/users", userController.all)
router.post("/single/user/:id", userController.single)
router.post("/user/update",userUpload.single("userImage") , userController.update)
router.post("/user/changeStatus", userController.changeStatus)


// Guide api's
router.post("/all/guides", guideController.all)
router.post("/single/guide/:id", guideController.single)
router.post("/guide/update", guideUpload.single("guideImage"), guideController.update)
router.post("/guide/changeStatus", guideController.changeStatus)



// Destination Api's
router.post("/single/destination", destinationController.single)


// Journal Api's
router.post("/all/journal" , journalController.all)
router.post("/single/journal" , journalController.single)


// Booking Api's
router.post("/all/booking" , bookingController.all)
router.post("/single/booking" , bookingController.single)


// Ads Api
router.post("/all/ads" , adsController.all)
router.post("/single/ads" , adsController.single)


// Gallery Api's
router.post("/all/gallery" , galleryController.all)
router.post("/single/gallery" , galleryController.single)


// Report Api's
router.post("/add/report", reportController.add)
router.post("/single/report", reportController.single)

// Rating api
router.post("/all/ratings", ratingController.all )

module.exports = router