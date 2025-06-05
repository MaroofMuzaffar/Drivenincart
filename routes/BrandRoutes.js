const BrandRouter = require('express').Router()
const { brandUploader } = require('../middleware/fileuploader')
const {verifyAdmin}= require('../middleware/authentication')
const {
    createRecords,
     getRecords,
      getSingleRecords,
      updateRecords,
      deleteRecords
    } =require("../controlers/BrandControllers")


BrandRouter.post("", verifyAdmin,brandUploader.single("pic"),createRecords)
BrandRouter.get("",getRecords)
BrandRouter.get("/:_id",getSingleRecords)
BrandRouter.put("/:_id", verifyAdmin,brandUploader.single("pic"),updateRecords)
BrandRouter.delete("/:_id", verifyAdmin,deleteRecords)


module.exports  =  BrandRouter