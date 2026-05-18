const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");

// [GET] /
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    })

    const layoutProductsCategory = createTreeHelper.tree(records);
    res.render("client/pages/home/index", {
        pageTitle: "Trang chu",
        layoutProductsCategory: layoutProductsCategory
    })
}