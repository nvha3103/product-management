const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
    // console.log('luôn chạy qua đây');
    const productsCategory = await ProductCategory.find({ deleted: false });

    const newProductsCategory = createTreeHelper.tree(productsCategory);

    res.locals.layoutProductsCategory = newProductsCategory;
    next();
}