const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/my-account.controller")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
// const validate = require("../../validate/admin/product-category.validate")

const multer = require("multer")
const upload = multer()

router.get("/", controller.index);

router.get("/edit", controller.edit);

router.patch(
    "/edit",
    upload.single("avatar"),
    uploadCloud.uploadCloud,
    controller.editPatch
);

module.exports = router;