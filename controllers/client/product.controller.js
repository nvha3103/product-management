const Product = require("../../models/product.model")

// [Get] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    })
        .sort({ position: "desc" });

    const newProduct = products.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0)
        return item;
    })

    // console.log(products);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sach san pham",
        products: products
    })
}

// [Get] /products/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    console.log(slug)
    // res.render("client/pages/products/detail", {
    //     pageTitle: "Chi tiet san pham",

    // })

    try {
        console.log("req: ", req.params.id);

        const find = {
            deleted: false,
            slug: slug,
            status: "active"
        }

        const product = await Product.findOne(find)

        console.log("product: ", product);
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        // res.flash("error", "San pham khong ton tai hoac da bi xoa")
        res.redirect(`/products`)
    }
}