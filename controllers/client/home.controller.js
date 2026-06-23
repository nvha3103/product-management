const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products")
// [GET] /
module.exports.index = async (req, res) => {
    // Lay ra san pham noi bat
    const productsFeatured = await Product.find({
        deleted: false,
        featured: "1",
        status: "active"
    })
    console.log("productsFeatured: ", productsFeatured);
    const newProductFeatured = productsHelper.priceNewProducts(productsFeatured);
    // Lay ra san pham noi bat

    // Hien thi ra danh sach san pham moi nhat
    const productNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(6);
    const newProductNew = productsHelper.priceNewProducts(productNew);
    // Hien thi ra danh sach san pham moi nhat


    res.render("client/pages/home/index", {
        pageTitle: "Trang chu",
        productsFeatured: newProductFeatured,
        productNew: newProductNew
    })
}