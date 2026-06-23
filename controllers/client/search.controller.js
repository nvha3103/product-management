const Product = require("../../models/product.model")
const productHelper = require("../../helpers/products")

// [GET] /search
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    let newProducts = [];
    if (keyword) {
        const regex = new RegExp(keyword, "i");
        const products = await Product.find({
            title: regex,
            deleted: false,
            status: "active"
        });
        console.log("products: ", products);
        newProducts = productHelper.priceNewProducts(products);

        res.render("client/pages/search/index", {
            pageTitle: "Tim kiem san pham",
            keyword: keyword,
            products: newProducts
        })
    }


}