const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
    {
        user_id: String,
        products: [
            {
                product_id: String,
                quantity: Number
            }
        ]
    }, {
    timestamps: true // tu dong tao ra 2 truong createdAt va updatedAt
}
)

const Cart = mongoose.model("Cart", cartSchema, "carts")

module.exports = Cart;