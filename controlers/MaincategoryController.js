const Maincategory =require ("../models/Maincategory")
 const fs = require("fs")  // these line is for code delete




async function  createRecords(req,res){    
try {
    let data =new Maincategory(req.body)
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
    error.keyValue ? errorMessage.name = "Maincategory With This Name Already Exist" : null
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
        reason: errorMessage
    })

}
}

async function getRecords(req,res) {
    try {
        let data=await  Maincategory.find().sort({_id:-1}) // so i will get latest data
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
        let data= await Maincategory.findOne({_id:req.params.id})  // get single records
        if (data) {
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
async function updateRecords(req, res) {
    try {
        let data = await Maincategory.findOne({ _id: req.params._id })
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
        error.keyValue ? errorMessage.name = "Maincategory With This Name Already Exist" : null

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
async function deleteRecords(req,res) {
    try {
        let data= await Maincategory.findOne({_id:req.params._id})  // get delete records
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
//async function updateRecords(req,res) {
//     try {
//         let data= await Maincategory.findOne({_id:req.params._id})  // update  records
//         if (data) {
//             data.name = req.body.name ?? data.name         //if their is data name data.name
//             data.active = req.body.active ?? data.active   //if their is data name otherwise data.active
//             if (await data.save()&& req.file) {           // these lines or for pick  await .data is use that it will not delete first image
//                 try {
//                     fs.unlinkSync(data.pic)               //for delete old file
//                 } catch (error) {
//                     data.pic=req.file.path              // after deleting we have to asign this
//                     await data.save()
//                 }
//             }
//             res.send ({
//                 result:"Done",                
//                 data:data
//              })
//         }else{
//             res.status(404).send ({
//                 result:"Fail",
//                 reason:"Record Not Found"
//              })
//         }
//     } catch (error) {
//          try {
//                fs.unlinkSync(req.file.path)  // if any problem delete uploaded file
//                 } catch (error) { }
//                 let errorMessage = {}
//                 error.keyValue ? errorMessage.name = "Maincategory With This Name Already Exist" : null
        
//                 if (Object.values(errorMessage).length === 0) {
//                     res.status(500).send({
//                         result: "Fail",
//                         reason: "Internal Server Error"
//                     })
//                 }
//         res.status(500).send({
//             result: "Fail",
//             reason: "Internal Server Error"
//     })
//     }
// }
module.exports ={
    createRecords:createRecords, 
    getRecords: getRecords,
    getSingleRecords:getSingleRecords,
    updateRecords:updateRecords,
    deleteRecords:deleteRecords
    
    
}