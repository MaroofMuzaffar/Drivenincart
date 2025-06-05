const multer = require("multer")

function createUploader(folder) {  
    const storage = multer.diskStorage({   //we will create a storage here
        destination: function (req, file, cb) {   // destination is a callback function in which we say him where our file ha to store in it we have 3 parameters{cb=callback}
            cb(null, `public/uploads/${folder}`)   // in it we have 2 parameters error and folder name {`public/${folder} this is destanation where we have to upload file}
        },
        filename: function (req, file, cb) {  // after cb we have to say him that what we have to give name of file
            cb(null, Date.now() + file.originalname) // in cb we have {Date.now() + file.originalname in which we will append date with file to get unique numer if the 2 user upload same file it will not clash}
        }
    })

    return multer({ storage: storage })  // we will   create upload so we can pass storage object
}

module.exports = {
    maincategoryUploader: createUploader("maincategory"), // we will create directory where we have to upload file
    subcategoryUploader: createUploader("subcategory"),
    brandUploader: createUploader("brand"),
    testimonialUploader: createUploader("testimonial"),
    productUploader: createUploader("product"),
    userUploader: createUploader("user")
}