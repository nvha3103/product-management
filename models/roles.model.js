const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        permissions: {
            type: Array,
            default: []
        },
        slug: {
            type: String,
            slug: "title", // tu dong tao slug tu title

            unique: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    }, {
    timestamps: true // tu dong tao ra 2 truong createdAt va updatedAt
}
)

const Role = mongoose.model("Role", roleSchema, "roles")

module.exports = Role;