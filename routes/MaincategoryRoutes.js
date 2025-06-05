const MaincategoryRouter = require("express").Router();
const {maincategoryUploader}=require("../middleware/fileuploader") //we will recive it here by calling it
const {verifyAdmin}=require("../middleware/authentication")
 const {
    createRecords,
    getRecords,
    getSingleRecords,
    updateRecords,
    deleteRecords,
    
   

     } =require("../controlers/MaincategoryController")

MaincategoryRouter.post("" ,verifyAdmin,maincategoryUploader.single("pic"),createRecords) // and we will use it here after this we will go to controllers

MaincategoryRouter.get("" ,getRecords )
MaincategoryRouter.get("/_id",getSingleRecords)
MaincategoryRouter.put("/:_id",verifyAdmin,maincategoryUploader.single("pic"),updateRecords)
MaincategoryRouter.delete("/:_id",verifyAdmin,deleteRecords)



module.exports  = MaincategoryRouter