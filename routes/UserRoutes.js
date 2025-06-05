const UserRouter = require('express').Router()
const { verifyAdmin,verifyBoth } = require('../middleware/authentication')
const { userUploader } = require('../middleware/fileuploader')
const { createRecords,
     getRecords,
     getSingleRecords,
     updateRecords,
     deleteRecords,
     login, 
     forgetPassword1,
     forgetPassword2,
     forgetPassword3
    
} =require("../controlers/UserController")




UserRouter.post("",createRecords)
UserRouter.get("",verifyAdmin,getRecords)
UserRouter.get("/:_id",verifyBoth,getSingleRecords)
UserRouter.put("/:_id",userUploader.single("pic"),updateRecords)
UserRouter.delete("/:_id",deleteRecords)
UserRouter.post("/login",login)
UserRouter.post("/forget-password-1",forgetPassword1)
UserRouter.post("/forget-password-2",forgetPassword2)
UserRouter.post("/forget-password-3",forgetPassword3)


module.exports  =  UserRouter