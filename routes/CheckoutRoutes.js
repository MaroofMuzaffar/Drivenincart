const  CheckoutRouter = require('express').Router()
const { verifyAdmin,verifyBoth } = require('../middleware/authentication')
const { createRecords,   
        getRecords,
        getUserRecords,
        getSingleRecords,        
        deleteRecords,
        updateRecords,
        order,
        verifyOrder,
        
         } =require("../controlers/CheckoutController")


 CheckoutRouter.post("",verifyBoth,createRecords)
 CheckoutRouter.get("",verifyAdmin,getRecords)
  CheckoutRouter.get("/user/:userid",verifyBoth,getUserRecords)
 CheckoutRouter.get("/single/:_id",verifyBoth,getSingleRecords)
 
 CheckoutRouter.put("/:_id",verifyBoth,updateRecords)
 CheckoutRouter.delete("/:_id",verifyBoth,deleteRecords)
 CheckoutRouter.post("/order",verifyBoth, order)
CheckoutRouter.post("/verify",verifyBoth, verifyOrder)


module.exports  = CheckoutRouter