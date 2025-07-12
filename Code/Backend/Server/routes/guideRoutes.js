const guideController = require("../api/guide/guideController")
const adsController = require("../api/advertisements/adsController")
const router = require("express").Router()
const multer = require("multer")


// Ads image multer code
const adsStorage = multer.memoryStorage()
const adsUpload = multer({ storage: adsStorage })

// guide image multer code
const guideStorage = multer.memoryStorage()
const guideUpload = multer({ storage: guideStorage })


// Guide registeration
router.post("/register", guideUpload.single("guideImage"), guideController.register)


// Token checker to require login
router.use(require("../middleware/guideTokenChecker"))


//Advertisement API's
router.post("/add/advertisement",adsUpload.single("adsImage"), adsController.add)


module.exports = router