const router = require("express").Router()
const multer = require("multer")

const journalController = require("../api/journals/journalController")
const galleryController = require("../api/gallery/galleryController")
const bookingcontroller = require("../api/booking/bookingController")
const toDocontroller = require("../api/toDoList/toDoController")
const ratingController = require("../api/ratings/ratingController")


// Gallery image multer code
const galleryStorage = multer.memoryStorage()
const galleryUpload = multer({ storage: galleryStorage })


// To provide access to api's only after login
router.use(require("../middleware/userTokenChecker"))

// Journal Api's
router.post("/add/journal", journalController.add )
router.post("/update/journal", journalController.update )
router.post("/changeStatus/journal", journalController.changeStatus)


// Gallery Api's
router.post("/add/gallery",galleryUpload.array("galleryImages"),galleryController.add)
router.post("/update/gallery",galleryUpload.array("galleryImages") , galleryController.update)


// Booking Api's
router.post("/add/booking", bookingcontroller.add)
router.post("/update/booking", bookingcontroller.update)


// To-Do Api's
router.post("/add/toDo", toDocontroller.add)
router.post("/all/toDo", toDocontroller.all)
router.post("/single/toDo", toDocontroller.single)
router.post("/update/toDo", toDocontroller.update)
router.post("/changeStatus/toDo", toDocontroller.changeStatus)


// Rating Api's
router.post("/add/ratings", ratingController.add)


module.exports = router