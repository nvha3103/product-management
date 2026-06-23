const ProductCategory = require("../../models/product-category.model")
const searchHelper = require("../../helpers/search")

const systemConfig = require("../../config/system")
const createTree = require("../../helpers/createTree");

module.exports.index = async (req, res) => {
    // console.log("req.query.status: ", req.query.status)
    let find = {
        deleted: false,
        // status: "active"
    }



    // console.log("req.query: ", req.query);

    // Tinh nang tim kiem
    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    // end tim kiem


    // sort
    let sort = {}

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.position = "desc"
    }
    // end sort

    // console.log("Lệnh sort đang là:", sort);
    const records = await ProductCategory.find(find)
        .sort(sort)

    const newRecords = createTree.tree(records);
    console.log(newRecords);
    // console.log(records);

    res.render("admin/pages/product-category/index", {
        pageTitle: "Hà nguyễn",
        records: newRecords,
        keyword: objectSearch.keyword,
    })

    // res.send("OK!")
}

module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }



    const records = await ProductCategory.find(find);
    const newRecords = createTree.tree(records);

    // console.log(newRecords);
    res.render("admin/pages/product-category/create", {
        pageTitle: "Tạo danh mục",
        records: newRecords
    })
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    const permission = res.locals.role.permissions;
    // console.log("permission: ", permission);
    if (permission.includes("products-category_create")) {
        console.log("Co quyen")
        if (req.body.position == "") {
            const countProducts = await ProductCategory.countDocuments();
            req.body.position = countProducts + 1;
            console.log(countProducts);
        } else {
            req.body.position = parseInt(req.body.position);
        }

        console.log(req.body);

        const productCategory = new ProductCategory(req.body); // Dung new ProductCategory de tao ra 1 doi tuong moi, sau do goi phuong thuc save de luu vao database

        await productCategory.save();

        res.redirect('/admin/products-category')
    } else {
        console.log("Khong co quyen")
        return;
    }
}

module.exports.detail = async (req, res) => {
    try {
        console.log("req: ", req.params.id);

        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await ProductCategory.findOne(find)

        console.log("product: ", product);
        res.render("admin/pages/product-category/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        req.flash("error", "San pham khong ton tai hoac da bi xoa")
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}

module.exports.edit = async (req, res) => {
    try {
        console.log("req: ", req.params.id);
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await ProductCategory.findOne(find)

        // console.log("product: ", product);
        const category = await ProductCategory.find({
            deleted: false
        })
        const newCategory = createTreeHelper.tree(category);
        res.render("admin/pages/product-category/edit", {
            pageTitle: "Chinh sua danh muc",
            product: product,
            category: newCategory
        })

    }
    catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}

// [PATCH] admin/products-category/detail/:id
module.exports.editPatch = async (req, res) => {
    // console.log(req.body);

    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await ProductCategory.updateOne({ _id: req.params.id }, req.body);
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    } catch (error) {
        res.flash("error", "Cap nhat san pham that bai")
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }

    // res.redirect('/admin/products-category/edit/' + req.params.id)
}
