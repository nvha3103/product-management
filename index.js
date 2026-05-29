require("dotenv").config();

const express = require('express')
const methodOverride = require("method-override")
var path = require('path');
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash");
const moment = require("moment")

const bodyParser = require("body-parser")
// import route ben client
const routeClient = require("./routes/client/index.route")

// import route ben admin
const routeAdmin = require("./routes/admin/index.route")
const systemConfig = require("./config/system");

const app = express();
const database = require("./config/database")



const port = process.env.PORT || 3000;

// use TinyMce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// flash 
app.use(cookieParser('JHGDSJFH'));
app.use(session({
    secret: 'JHGDSJFH', // Phải có secret key (có thể dùng chung với cookieParser)
    resave: false,      // Bắt buộc: không lưu lại session nếu không có thay đổi
    saveUninitialized: true, // Bắt buộc: lưu lại session mới tạo dù chưa có dữ liệu
    cookie: { maxAge: 60000 }
}));
app.use(flash());
app.use((req, res, next) => {
    // res.locals giúp biến messages có mặt ở TẤT CẢ các file .pug
    res.locals.messages = {
        success: req.flash('success'),
        error: req.flash('error')
    };
    next();
});

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");


// App locals Variables -> khi nay tat ca cac file pug deu co the su dung bien nay
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment; // de co the su dung duoc moment trong tat ca cac file .pug
// Vi deploy len online no khong hieu bien public laf gi nen phai su dung  __dirname(se cho biet cau truc project)
// app.use(express.static("public"))

app.use(express.static(`${__dirname}/public`))

app.use(async (req, res, next) => {
    try {
        await database.connect();
        next();
    } catch (error) {
        next(error);
    }
});

routeAdmin(app)
routeClient(app)

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

module.exports = app;
