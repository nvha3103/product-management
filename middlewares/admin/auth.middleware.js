const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");
const authCookieOptions = {
    httpOnly: true,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
};
const clearAuthCookieOptions = {
    httpOnly: true,
    path: "/"
};

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.clearCookie("userId", clearAuthCookieOptions);
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
        const user = await Account.findOne({
            token: req.cookies.token,
            deleted: false,
            status: "active"
        }).select("-password")
        if (!user) {
            res.clearCookie("token", clearAuthCookieOptions);
            res.clearCookie("userId", clearAuthCookieOptions);
            return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else {
            if (req.cookies.userId !== user.id) {
                res.cookie("userId", user.id, authCookieOptions);
            }

            const role = await Role.findOne({
                _id: user.role_id
            }).select("title permissions");
            res.locals.role = role;
            res.locals.user = user;
            next();
        }
    }

}
