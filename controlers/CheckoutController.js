const Checkout = require("../models/Checkout");
const Razorpay = require("razorpay")

//Payment API
async function order(req, res) {
    try {
        const instance = new Razorpay({
            key_id: process.env.RPKEYID,  // first we have to pass keys
            key_secret: process.env.RPSECRETKEY,
        });

        const options = {
            amount: req.body.amount * 100,   // we will get payment multiple by 100
            currency: "INR"
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.json({ data: order });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

async function verifyOrder(req, res) {  // it goes in front end to get verified
    try {
        var check = await Checkout.findOne({ _id: req.body.checkid })
        check.rppid = req.body.razorpay_payment_id
        check.paymentStatus = "Done"
        check.paymentMode = "Net Banking"
        await check.save()
        res.send({ result: "Done", message: "Payment SuccessFull" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
} // go and create routes in check out routes

async function createRecords(req, res) {
    try {
          let data = new Checkout(req.body)
        if (req.files) {
            data.pic = Array.from(req.files).map((x)=>x.path) // we have run a loop array and we get path of every image and map return an arry that data.pic will save . form for multiple images we use array after that we have to check error
        }
        await data.save();
         let finalData = await Checkout.findOne({ _id: data._id }) // we creat data final data to get populated value ande we have to populate inside populate
             .populate("user", ["name", "username", "email", "phone", "address", "pin", "city", "state"])
            .populate({
                path: "products.product",// when we put condition on array field we have to write array name their products.product

                select: "name brand color size basePrice stockQuantity pic",
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
        
       
        let errorMessage = {}
        error.errors?.user ? errorMessage.user = error.errors.user.message : null
        error.errors?.subtotal ? errorMessage.subtotal = error.errors.subtotal.message : null
        error.errors?.shipping ? errorMessage.shipping = error.errors.shipping.message : null
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
        let data = await Checkout.find().sort({ _id: -1 })
            .populate("user", ["name", "username", "email", "phone", "address", "pin", "city", "state"])
            .populate({
                path: "products.product",
                select: "name brand color size basePrice stockQuantity pic",
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


async function getUserRecords(req, res) { //if user login  to get its product
    try {
        let data = await Checkout.find({user:req.params.userid}).sort({ _id: -1 }) // this line is for if we want to find single user
              
                       .populate("user", ["name", "username", "email", "phone", "address", "pin", "city", "state"])
                       .populate({
                           path: "products.product",
                           select: "name brand color size basePrice stockQuantity pic",
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
            res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}
async function getSingleRecords(req, res) {
    try {
        let data = await Checkout.findOne({ _id: req.params._id })
           
                    .populate("user", ["name", "username", "email", "phone", "address", "pin", "city", "state"])
                    .populate({
                        path: "products.product",
                        select: "name brand color size basePrice stockQuantity pic",
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
        let data = await Checkout.findOne({ _id: req.params._id })
        if (data) {
            data.orderStatus = req.body.orderStatus ?? data.orderStatus
            data.paymentMode = req.body.paymentMode ?? data.paymentMode
            data.paymentStatus = req.body.paymentStatus ?? data.paymentStatus
            data.rppid = req.body.rppid ?? data.rppid
            await data.save()

            let finalData = await Checkout.findOne({ _id: data._id })
                
                          .populate("user", ["name", "username", "email", "phone", "address", "pin", "city", "state"])
                          .populate({
                              path: "products.product",
                              select: "name brand color size basePrice stockQuantity pic",
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
        let data = await Checkout.findOne({ _id: req.params._id });
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
    getUserRecords:getUserRecords,
    updateRecords: updateRecords,

    deleteRecords: deleteRecords,
            order:order,
      verifyOrder:verifyOrder

}
