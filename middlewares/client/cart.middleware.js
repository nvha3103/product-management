const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
const Cart = require("../../models/cart.model")

module.exports.cartId = async (req, res, next) => {
    // console.log('luôn chạy qua đây');
    console.log(req.cookies.cartId);
    if (!req.cookies.cartId) {
        // Tao gio hang
        const cart = new Cart();
        await cart.save();
        // console.log("cart: ", cart);
        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + 3600000), // cookie will be removed after 8 hours
        });
    } else {
        // Lay ra gio hang
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        })
        console.log("cart: ", cart);

        cart.quantityTotal = cart.products.reduce((total, item) => total + item.quantity, 0)

        res.locals.miniCart = cart;
    }
    next();
}