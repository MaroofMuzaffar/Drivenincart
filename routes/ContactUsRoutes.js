const ContactUsRouter = require('express').Router()
const { verifyAdmin } = require("../middleware/authentication")
const {
    createRecords,
     getRecords,
      getSingleRecords,
      updateRecords,
      deleteRecords
    } =require("../controlers/ContactUsController")


ContactUsRouter.post("",createRecords)
ContactUsRouter.get("",verifyAdmin,getRecords)
ContactUsRouter.get("/:_id",verifyAdmin,getSingleRecords)
ContactUsRouter.put("/:_id",verifyAdmin,updateRecords)
ContactUsRouter.delete("/:_id",verifyAdmin,deleteRecords)


module.exports  =  ContactUsRouter