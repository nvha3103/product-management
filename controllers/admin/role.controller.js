// [GET] /admin/roles  
const Role = require("../../models/roles.model.js")
const systemConfig = require("../../config/system")

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find);

    res.render("admin/pages/roles/index", {
        pageTitle: "Trang nhóm quyền",
        records: records
    })
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Tao nhom quyen"
    })
}

// [GET] /admin/roles/create
module.exports.createPost = async (req, res) => {
    console.log(req.body)
    const record = new Role(req.body);

    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        let find = {
            _id: id,
            deleted: false
        }

        const data = await Role.findOne(find);

        console.log(data);

        res.render("admin/pages/roles/edit", {
            pageTitle: "Tao nhom quyen",
            data: data
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

// [GET] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {

    const id = req.params.id;

    await Role.updateOne({ _id: id }, req.body);

    // console.log(data);
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find);
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phan quyen",
        records: records
    })
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    // console.log(req.body);

    const permissions = JSON.parse(req.body.permissions);
    // console.log(permissions);

    for (const item of permissions) {
        await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
    }
    req.flash("success", "Cập nhật quyền thành công");
    res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`);
} 
