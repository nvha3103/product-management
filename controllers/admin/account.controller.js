const bcrypt = require("bcryptjs");
const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
    const records = await Account.find({ deleted: false });
    // console.log(records);
    for (const record of records) {
        // console.log(record.role_id);
        const rowName = await Role.findOne({ _id: record.role_id });
        record.role_id = rowName.title;
        // console.log(record.role_id);
    }
    // console.log(records);
    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records,
    });
}

module.exports.create = async (req, res) => {

}

// POST /admin.accounts/create
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    });

    if (emailExist) {
        req.flash('error', `Email ${req.body.email} đã tồn tại!`);
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
    } else {
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        const record = new Account(req.body);
        await record.save();

        res.redirect(systemConfig.prefixAdmin + '/accounts')
    }
}

// GET /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const record = await Account.findOne({
            _id: req.params.id,
            deleted: false
        });

        const roles = await Role.find({
            deleted: false
        });

        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chinh sua tai khoan",
            record: record,
            roles: roles
        });
    } catch (error) {
        res.redirect(systemConfig.prefixAdmin + '/accounts');
    }
}

// PATCH /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const emailExist = await Account.findOne({
        _id: { $ne: id },
        email: req.body.email,
        deleted: false
    });
    if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại!`);
    } else {
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        }
        await Account.updateOne({ _id: id }, req.body);
        req.flash("success", "Cập nhật tại khoản thành công");
    }

    res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${id}`);
}
