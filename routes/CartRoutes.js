const CartRouter = require('express').Router()
const {verifyBoth}=require("../middleware/authentication")
const {
    createRecords,
     getRecords,
      getSingleRecords,
      updateRecords,
      deleteRecords
    } =require("../controlers/CartController")


CartRouter.post("", verifyBoth ,createRecords)
CartRouter.get("/:userid",verifyBoth ,getRecords)
CartRouter.get("/single/:_id",verifyBoth ,getSingleRecords)
CartRouter.put("/:_id",verifyBoth ,updateRecords)
CartRouter.delete("/:_id",verifyBoth ,deleteRecords)


module.exports  =  CartRouter