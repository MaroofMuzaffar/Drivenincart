const Cart = require("../models/Cart");


async function createRecords(req, res) {
    try {
          let data = new Cart(req.body)
        if (req.files) {
            data.pic = Array.from(req.files).map((x)=>x.path) // we have run a loop array and we get path of every image and map return an arry that data.pic will save . form for multiple images we use array after that we have to check error
        }
        await data.save();
         let finalData = await Cart.findOne({ _id: data._id }) // we creat data final data to get populated value ande we have to populate inside populate
            .populate("user", ["name", "username"])
            .populate({
                path: "product",
                select: "name brand color size finalPrice stockQuantity pic",
                populate: {
                    path: "brand",
                    select: "-_id name"
                },
                options: {
                    slice: {
                        pic: 1
                    }
                }
            })
                res.send({
                    result: "Done",
                    data: finalData
                })
    } catch (error) {
        
       
        let errorMessage = {};
         error.errors?.user ? errorMessage.user = error.errors.user.message : null
         error.errors?.product ? errorMessage.product = error.errors.product.message : null
         error.errors?.qty ? errorMessage.qty = error.errors.qty.message : null
         error.errors?.total ? errorMessage.total = error.errors.total.message : null
        
        if (Object.values(errorMessage).length === 0) {
            res.status(500).send({
                result: "Fail",
                reason: "Internal Server Error"
            })
        }
        else {
            res.status(400).send({
                result: "Fail",
                reason: errorMessage
            })
        }

       
    }
}

async function getRecords(req, res) {
    try {
        let data = await Cart.find({user:req.params.userid}).sort({ _id: -1 }) // this line is for if we want to find single user
            .populate("user", ["name", "username"])
            .populate({
                path: "product",
                select: "name brand color size finalPrice stockQuantity pic",
                populate: {
                    path: "brand",
                    select: "-_id name"
                },
                options: {
                    slice: {
                        pic: 1
                    }
                }
            })
        res.send({
            result: "Done",
            count: data.length,
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

async function getSingleRecords(req, res) {
    try {
        let data = await Cart.findOne({ _id: req.params._id })
        .populate("user", ["name", "username"])
            .populate({
                path: "product",
                select: "name brand color size finalPrice stockQuantity pic",
                populate: {
                    path: "brand",
                    select: "-_id name"
                },
                options: {
                    slice: {
                        pic: 1
                    }
                }
            })
        res.send({
            result: "Done",
            count: data.length,
            data: data
        });
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function updateRecords(req, res) {
    try {
        let data = await Cart.findOne({ _id: req.params._id })
        if (data) {
            data.qty = req.body.qty ?? data.qty
            data.total = req.body.total ?? data.total
            await data.save()

            let finalData = await Cart.findOne({ _id: data._id })
                .populate("user", ["name", "username"])
                .populate({
                    path: "product",
                    select: "name brand color size finalPrice stockQuantity pic",
                    populate: {
                        path: "brand",
                        select: "-_id name"
                    },
                    options: {
                        slice: {
                            pic: 1
                        }
                    }
                })

            res.send({
                result: "Done",
                data: finalData
            })
        }
        else
            res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            })
    } catch (error) {
        // console.log(error)

        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}
async function deleteRecords(req, res) {
    try {
        let data = await Cart.findOne({ _id: req.params._id });
        if (data) {
           

            await data.deleteOne()

            res.send({
                result: "Done",
                data: data
            });
        } else {
            res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

module.exports = {
    createRecords: createRecords,
    getRecords: getRecords,
    getSingleRecords: getSingleRecords,
    updateRecords: updateRecords,
    deleteRecords: deleteRecords
}
