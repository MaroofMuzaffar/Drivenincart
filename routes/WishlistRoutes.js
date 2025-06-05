const WishlistRouter = require("express").Router()
const { verifyBoth } = require("../middleware/authentication")

const {
    createRecords,
    getRecords,
    getSingleRecords,
    deleteRecords,
    
} = require("../controlers/WishlistController")

WishlistRouter.post("", verifyBoth, createRecords)
WishlistRouter.get("/:userid", verifyBoth, getRecords)
WishlistRouter.get("/single/:_id", verifyBoth,getSingleRecords);
WishlistRouter.delete("/:_id",verifyBoth,  deleteRecords)


module.exports = WishlistRouter