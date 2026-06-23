const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
const ProductCategory = require("../../models/product-category.model")
const productsCategoryHelper = require("../../helpers/products-category")
// [Get] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    })
        .sort({ position: "desc" });

    const newProduct = productsHelper.priceNewProducts(products);

    // console.log(products);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sach san pham",
        products: newProduct
    })
}

// [Get] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        }

        const product = await Product.findOne(find)

        if (product.product_category_id) {
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                deleted: false
            })
            product.category = category;
        }

        product.priceNew = productsHelper.priceNewProduct(product);

        // console.log("product: ", product);
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        // res.flash("error", "San pham khong ton tai hoac da bi xoa")
        res.redirect(`/products`)
    }
}

// [Get] /products/:slugCategory
module.exports.category = async (req, res) => {
    const slug = req.params.slugCategory;
    // console.log("slug: ", slug);

    const category = await ProductCategory.findOne({
        slug: slug.slice(-1)[0],
        deleted: false
    })
    // console.log("category: ", category);
    // console.log("category_id: ", category.id);

    const listenSubCategory = await productsCategoryHelper.getSubCategory(category.id);
    // console.log("listenSubCategory: ", listenSubCategory);

    const listCategoryId = listenSubCategory.map(item => item.id);
    // console.log("listCategoryId: ", listCategoryId);


    const products = await Product.find({
        product_category_id: { $in: [category.id, ...listCategoryId] },
        deleted: false,
        status: "active"
    }).sort({ position: "desc" });

    const newProduct = productsHelper.priceNewProducts(products);
    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProduct
    })

}