const express = require("express")
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser");



const Port = 5000

app.listen(Port, ()=>{
    console.log("Server running at ", Port);
})

app.get("/",(req,res)=>{
    res.json({
        status:200,
        success:true,
        message:"Running Successfully"
    })
})

app.use(cors())
app.use(bodyParser.json());


app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"40mb"}))   


// for using product and category api's
const api = require('./Server/routes/apiRoutes')
app.use('/api',api)

const admin = require("./Server/routes/adminRoutes")
app.use('/admin', admin)

const user = require("./Server/routes/userRoutes")
app.use('/user', user)

const guide = require("./Server/routes/guideRoutes")
app.use('/guide', guide)

const seed = require("./Server/config/seed")

// for using database
const db = require("./Server/config/db")

// for access to the images folder
app.use(express.static("./Server/public/"))