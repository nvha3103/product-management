const { body, validationResult } = require('express-validator');
const systemConfig = require("../../config/system");

const loginPath = `${systemConfig.prefixAdmin}/auth/login`;
const registerPath = `${systemConfig.prefixAdmin}/auth/register`;

const validateLogin = [
    body('email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),
    body('password')
        .notEmpty().withMessage('Mật khẩu không được để trống'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg);
            return res.redirect(loginPath);
        }
        next();
    }
];

const validateRegister = [
    body('fullName')
        .notEmpty().withMessage('Họ tên không được để trống')
        .isLength({ min: 2 }).withMessage('Họ tên phải có ít nhất 2 ký tự'),
    body('email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),
    body('password')
        .notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
    body('confirmPassword')
        .notEmpty().withMessage('Vui lòng xác nhận mật khẩu')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Mật khẩu xác nhận không khớp'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg);
            return res.redirect(registerPath);
        }
        next();
    }
];

module.exports = {
    loginPost: validateLogin,
    registerPost: validateRegister
};
