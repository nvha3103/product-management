module.exports.createPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Vui long nhap email")
        return res.redirect("/admin/accounts/create")
    }

    if (!req.body.password) {
        req.flash("error", "Vui long nhap mat khau")
        return res.redirect("/admin/accounts/create")
    }

    next();
}

module.exports.editPatch = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui long nhap ten")
        return res.redirect(`/admin/accounts/edit/${req.params.id}`)
    }

    next();
}
