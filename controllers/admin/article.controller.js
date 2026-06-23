const Article = require("../../models/article.model")
const Account = require("../../models/account.model")
// [GET] admin/article
module.exports.index = async (req, res) => {
    const articles = await Article.find();
    console.log("articles", articles);
    res.render("admin/pages/article/index", {
        pageTitle: "Danh sach bai viet",
        articles: articles
    })
}

// [GET] admin/article/create
module.exports.create = async (req, res) => {

    res.render("admin/pages/article/create", {
        pageTitle: "Bài viết",

    })
}

// [POST] admin/article/create
module.exports.articlePost = async (req, res) => {
    // console.log('Da submit thanh cong')
    // console.log("req.body: ", req.body)
    const userId = req.cookies.userId;
    const author = await Account.findOne({
        _id: userId
    })
    // console.log("author", author.fullname)

    // console.log("userId", userId)
    const newArticle = {
        author: author.fullName,
        ...req.body
    }

    // console.log(newArticle);
    const article = new Article(newArticle)
    await article.save();

    res.redirect("/admin/articles")
}


