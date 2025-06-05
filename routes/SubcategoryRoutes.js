
const SubcategoryRouter= require('express').Router()
const {subcategoryUploader} =require ("../middleware/fileuploader")
const { verifyAdmin } = require("../middleware/authentication")
const { 
    createRecords, 
    getSingleRecords,
    getRecords,
    updateRecords,
    deleteRecords

     } = require('../controlers/SubcategoryControler')




SubcategoryRouter.post("",verifyAdmin, subcategoryUploader.single("pic"), createRecords)
SubcategoryRouter.get("",getRecords)
SubcategoryRouter.get("/:_id",getSingleRecords)
SubcategoryRouter.put("/:_id",verifyAdmin, subcategoryUploader.single("pic"),updateRecords)
SubcategoryRouter.delete("/:_id",verifyAdmin, deleteRecords)

module.exports  = SubcategoryRouter