const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema(
    {
        title: String,
        thumbnail: String,
        position: Number,
        status: String,
        author: String,
        content: String
    }, {
    timestamps: true // tu dong tao ra 2 truong createdAt va updatedAt
}
)

const Article = mongoose.model("Article", articleSchema, "articles")

module.exports = Article;