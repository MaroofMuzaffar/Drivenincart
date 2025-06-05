const Subcategory=require("../models/Subcategory")
const fs=require("fs")

async function createRecords(req,res) {
    try {
        let data= new Subcategory(req.body)
        if (req.file) {
            data.pic=req.file.path // this line is for where our pick is uploaded we will save its  path and then we  redirect
        }
        await data.save()
        res.send({
            result:'done',
            data:data
        })  
        
    } catch (error) {
          try {
                fs.unlinkSync(req.file.path)  // for delete file{if we got error in uploading pic we will delete it }
            } catch (error) { }
        let errorMessage={} // proper validation for error feild, when we take unique value we got key error {error in the form of key value}
        error.keyValue ? errorMessage.name = "Subcategory With This Name Already Exist" : null

        error.errors?.name ? errorMessage.name = error.errors.name.message : null
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : null
        if (Object.values(errorMessage).length === 0) {
            res.status(500).send({
                result: "Fail",
                reason:  "Internal Server Error"  
            })
        }
        res.status(400).send({
            result: "Fail",
            reason: errorMessage
        })
    }
        
}
async function getRecords(req,res) {
    try {
        let data=await  Subcategory.find().sort({_id:-1}) // so i will get latest data
         res.send ({
            result:"Done",
            length:data.length,
            data:data
         })
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
    })
    }
}
async function getSingleRecords(req,res) {
    try {
        let data=await  Subcategory.findOne({_id:req.params._id})
         if (data) {
            res.send ({
                result:"Done",
              
                data:data
             })
         }else{
            res.status(404).send ({
                result:"Done",
              
                data:data
             })
         }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
    })
    }
}
async function updateRecords(req,res) {
    try {
        let data=await  Subcategory.findOne({_id:req.params._id}) // first we have to find data which we have to upload
         if (data) {
            data.name = req.body.name ?? data.name       // adar data .req. body ma name nahi ha tho purana ajaya
            data.active = req.body.active ?? data.active
             if (await data.save()&& req.file) {           // agar file upload ki hai purani image ko delete karna pada ga  and we have to upload new image
                            try {
                                fs.unlinkSync(data.pic)             
                            } catch (error) {
                                data.pic=req.file.path              
                                await data.save()
                            }
                        }
            res.send ({
                result:"Done",
              
                data:data
             })
         }else{
            res.status(404).send ({
                result:"Done",
              
                data:data
             })
         }
    } catch (error) {
        try {
                     fs.unlinkSync(req.file.path)  // if any problem delete uploaded file
                      } catch (error) { }
                      let errorMessage = {}
                      error.keyValue ? errorMessage.name = "Subcategory With This Name Already Exist" : null
              
                      if (Object.values(errorMessage).length === 0) {
                          res.status(500).send({
                              result: "Fail",
                              reason: "Internal Server Error"
                          })
                      }
              res.status(500).send({
                  result: "Fail",
                  reason: "Internal Server Error"
          })
          }
        }
        async function deleteRecords(req,res) {
            try {
                let data= await  Subcategory.findOne({_id:req.params._id})  // get delete records
                if (data) {
                    try {
                         fs.unlinkSync(data.pic)
                    } catch (error) {}
                    await data.deleteOne()
                    res.send ({
                        
                        result:"Done",                
                        data:data
                     })
                }else{
                    res.status(404).send ({
                        result:"Fail",
                        reason:"Record Not Found"
                     })
                }
            } catch (error) {
                res.status(500).send({
                    result: "Fail",
                    reason: "Internal Server Error"
            })
            }
        }
module.exports={
    createRecords:createRecords,
    getRecords:getRecords,
    getSingleRecords:getSingleRecords, 
    updateRecords:updateRecords,
    deleteRecords:deleteRecords
}