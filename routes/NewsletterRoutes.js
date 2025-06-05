const NewsletterRouter = require('express').Router()
const { verifyAdmin } = require("../middleware/authentication")
const {
    createRecords,
     getRecords,
      getSingleRecords,
      updateRecords,
      deleteRecords
    } =require("../controlers/NewsletterController")


NewsletterRouter.post("",createRecords)
NewsletterRouter.get("",verifyAdmin,getRecords)
NewsletterRouter.get("/:_id",verifyAdmin,getSingleRecords)
NewsletterRouter.put("/:_id",verifyAdmin,updateRecords)
NewsletterRouter.delete("/:_id",verifyAdmin,deleteRecords)


module.exports  =  NewsletterRouter