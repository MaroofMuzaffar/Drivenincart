const ProductRouter = require("express").Router()
const {productUploader}=require("../middleware/fileuploader")
const { verifyAdmin, verifyBoth } = require("../middleware/authentication")
const { 
     createRecords,
      getRecords,
       getSingleRecords,
        updateRecords,
         deleteRecords }=require ("../controlers/ProductControllers")
    
     

ProductRouter.post("",verifyAdmin,productUploader.array("pic"),createRecords) // we use array for multiple field
ProductRouter.get("",getRecords)
ProductRouter.get("/:_id",getSingleRecords)
ProductRouter.put("/:_id",verifyBoth,productUploader.array("pic"),updateRecords)
ProductRouter.delete("/:_id",verifyAdmin,deleteRecords)

module.exports  = ProductRouter