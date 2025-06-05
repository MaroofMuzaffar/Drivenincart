const Brand =require ("../models/Brand")
const fs = require("fs") 
async function createRecords(req,res) {

  try {
    let data = new Brand(req.body)
    if (req.file) {
        data.pic= req.file.path   // we have to write these lines  for redirect after that we will write code for delete in try 
   }
    await data.save()
    res.send({
        result:"Done",
        data:data
    })
  } catch (error) {
      try {
            fs.unlinkSync(req.file.path)  // for delete file
        } catch (error) { }

    let errorMessage={}
    error.keyValue ? errorMessage.name = "Brand With This Name Already Exist" : null

    error.errors?.name ? errorMessage.name = error.errors.name.message : null
    error.errors?.pic ? errorMessage.pic = error.errors.pic.message : null
  if (Object.values(errorMessage).length === 0) {
    res.status(500).send({
        result: "Fail",
        reason: "Internal Server Error"   
    })
  }
  res.status(400).send({
    result:"Fail",
    reason:errorMessage
})
  }
}
async function getRecords(req,res) {
    
try {
    let data =await Brand.find().sort({_id:-1});
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
        let data=await  Brand.findOne({_id:req.params._id})
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

async function updateRecords(req, res) {
    try {
        let data = await Brand.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.active = req.body.active ?? data.active
            if (await data.save() && req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = req.file.path
                await data.save()
            }
            
            res.send({
                result: "Done",
                data: data
            })
        }
        else
            res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            })
    } catch (error) {
        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }

        let errorMessage = {}
        error.keyValue ? errorMessage.name = "Brand With This Name Already Exist" : null

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

async function deleteRecords(req, res) {
    try {
        let data = await Brand.findOne({ _id: req.params._id })
        if (data){
            try {
                fs.unlinkSync(data.pic)
            } catch (error) {}
            await data.deleteOne()
            res.send({
                result: "Done",
                data: data
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
module.exports={
    createRecords:createRecords,
    getRecords:getRecords,
    getSingleRecords:getSingleRecords,
    updateRecords:updateRecords,
     deleteRecords: deleteRecords
}