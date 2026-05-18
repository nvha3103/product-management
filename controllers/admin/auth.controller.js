const bcrypt = require("bcryptjs");
const Account = require("../../models/account.model");
const generate = require("../../models/helpers/generate");

const systemConfig = require("../../config/system");
const loginPath = `${systemConfig.prefixAdmin}/auth/login`;
const registerPath = `${systemConfig.prefixAdmin}/auth/register`;

// GET /admin/auth/login
module.exports.login = async (req, res) => {
    //         pageTitle: "Đăng nhập hệ thống",
    if (req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
        res.render("admin/pages/auth/login", {
            pageTitle: "Đăng nhập hệ thống",
            error: req.flash("error"),
            success: req.flash("success")
        })
    }

}

// POST /admin/auth/login
module.exports.loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Account.findOne({
            email: email,
            deleted: false
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            req.flash("error", "Email hoặc mật khẩu không đúng!");
            return res.redirect(loginPath);
        }

        if (user.status !== "active") {
            req.flash("error", "Tài khoản của bạn chưa được kích hoạt!");
            return res.redirect(loginPath);
        }

        if (!user.token) {
            user.token = generate.generateRandomString(20);
            await user.save();
        }

        res.cookie("token", user.token, {
            httpOnly: true,
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } catch (error) {
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại!");
        res.redirect(loginPath);
    }
}

// GET /admin/auth/register
module.exports.register = async (req, res) => {
    if (req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
        res.render("admin/pages/auth/register", {
            pageTitle: "Đăng ký tài khoản",
            error: req.flash("error"),
            success: req.flash("success")
        });
    }
}

// POST /admin/auth/register
module.exports.registerPost = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if (!fullName || !email || !password) {
            req.flash("error", "Vui lòng điền đầy đủ thông tin!");
            return res.redirect(registerPath);
        }

        if (password !== confirmPassword) {
            req.flash("error", "Mật khẩu xác nhận không khớp!");
            return res.redirect(registerPath);
        }

        const emailExist = await Account.findOne({
            email: email,
            deleted: false
        });

        if (emailExist) {
            req.flash("error", `Email ${email} đã tồn tại!`);
            return res.redirect(registerPath);
        }

        req.body.password = bcrypt.hashSync(password, 10);
        req.body.role_id = "67f1b4f3e1b2c8a9d0e1f2a3"; // ID mặc định cho role user
        req.body.status = "active";

        const record = new Account(req.body);
        await record.save();

        req.flash("success", "Đăng ký thành công! Vui lòng đăng nhập.");
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } catch (error) {
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại!");
        res.redirect(registerPath);
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        path: "/"
    });
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}
