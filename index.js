const express = require("express")
const cors = require("cors")
const path = require("path") // for build to cennectivity

require("dotenv").config()

require("./db_connect")

const Router =require("./routes/index")  //defining path of routes in routes and line 8
const app = express()
var whitelist = ['http://localhost:3000', 'http://localhost:8000'] // for spefic task
var corsOptions = {
    origin: function (origin, callback) {
        // console.log("Origin",origin)
        if (whitelist.includes(origin) !== -1) { // origin will check it is in our http 
            callback(null, true)
        } else {
            callback(new Error('CORS Error, You Are not authenciated to access this api'))
        }
    }
}
app.use(cors(corsOptions))
app.use(express.json()) // used to parse incomming json data
app.use("/public", express.static("public"))//used to server public files like uploaded images multer after doing this we will call it on routers maincategory and others
app.use(express.static(path.join(__dirname, 'build')))//build

app.use("/api",Router)
app.use('*', express.static(path.join(__dirname, 'build')))// build


let port =process.env.PORT || 8000 // these lines for dot env file
app.listen(port, console.log(`Server is Running at http://localhost:8000`))