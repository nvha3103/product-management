const express = require("express")
const route = express.Router()

const controller = require("../../controllers/admin/article.controller")

const multer = require("multer")
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

route.get("/", controller.index);

route.get("/create", controller.create);

route.post("/create",
    upload.single("thumbnail"),
    uploadCloud.uploadCloud,
    controller.articlePost)

module.exports = route;