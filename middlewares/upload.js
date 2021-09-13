const multer = require("multer");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

var restoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/assets/restoImage");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

var menuStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/assets/menuImage");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

var uploadRestoImage = multer({ storage: restoStorage, fileFilter: imageFilter });
var uploadMenuImage = multer({ storage: menuStorage, fileFilter: imageFilter });


module.exports = {
    uploadRestoImage,
    uploadMenuImage
}
