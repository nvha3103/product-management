const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
//[POST] /cart/add/:productId

module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    // console.log("productId: ", productId);
    // console.log("quantity: ", quantity);

    const cart = await Cart.findOne({
        _id: cartId
    })

    // console.log("cart-product:", cart.products)

    const exitProduct = cart.products.find(item => item.product_id == productId);
    // console.log("exitProduct: ", exitProduct);


    if (exitProduct) {
        const quantityNew = exitProduct.quantity + quantity;
        await Cart.updateOne(
            {
                _id: cartId,
                "products.product_id": productId
            }, {
            $set: { "products.$.quantity": quantityNew }
        }
        )
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        }

        await Cart.updateOne(
            {
                _id: cartId
            }, {
            $push: { products: objectCart }
        }
        )
    }

    req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công")
    res.redirect("/products");

}

module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    // console.log("cartId: ", cartId);
    const cart = await Cart.findOne({
        _id: cartId
    })
    // console.log("cart products: ", cart.products);

    const listProductOfCart = []

    for (const item of cart.products) {
        // console.log("item.id", item.product_id)
        const product = await Product.findOne({
            _id: item.product_id
        })
        // console.log("product", product)
        const productInCartDetail = {
            title: product.title,
            id: product.id,
            thumbnail: product.thumbnail,
            slug: product.slug,
            price: parseInt(product.price * (100 - product.discountPercentage) / 100),
            quantity: item.quantity,
            totalPrice: parseInt(item.quantity) * parseInt(product.price * (100 - product.discountPercentage) / 100)
        }
        listProductOfCart.push(productInCartDetail);

    }

    const totalPriceCart = listProductOfCart.reduce((sum, item) => sum += item.totalPrice, 0)

    // console.log("listProductOfCart", listProductOfCart);

    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng của bạn",
        listProductOfCart: listProductOfCart,
        totalPriceCart: totalPriceCart
    })
}

//[GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: { products: { product_id: productId } }
    })

    req.flash("success", "Xóa sản phẩm thành công")
    res.redirect("/cart")
}

//[GET] /update/:productId/:quantity
module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;

    // console.log(req.params)
    await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId
    }, {
        $set: {
            "products.$.quantity": quantity
        }
    })

    req.flash("success", "Cap nhat san pham thanh cong")
    res.redirect("/cart")
}