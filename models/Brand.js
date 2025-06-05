const  mongoose= require("mongoose");
 const BrandSchema =new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"Brand Name Is Mandatory"]
         },
    pic:{
        type:String,
        required:[true,"Brand Pic Is Mandatory"]
        },
    active:{
            type: Boolean,
            default:true

           }

})
const Brand = new mongoose.model('Brand',BrandSchema)
module.exports =Brand


