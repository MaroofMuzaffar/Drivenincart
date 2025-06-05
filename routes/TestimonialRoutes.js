const TestimonialRouter = require("express").Router()
const { testimonialUploader } = require("../middleware/fileuploader")
const { verifyAdmin } = require("../middleware/authentication")
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
} = require("../controlers/TestimonialControllers")

TestimonialRouter.post("",verifyAdmin, testimonialUploader.single("pic"), createRecord)
TestimonialRouter.get("", getRecord)
TestimonialRouter.get("/:_id", getSingleRecord)
TestimonialRouter.put("/:_id",verifyAdmin, testimonialUploader.single("pic"), updateRecord)
TestimonialRouter.delete("/:_id",verifyAdmin, deleteRecord)


module.exports = TestimonialRouter