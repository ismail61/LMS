const multer = require('multer'),
    { v4: uuidv4 } = require('uuid'),
    path = require('path')
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        let extension = path.extname(file.originalname);
        if (extension != '.png' && extension != '.jpg' && extension != '.jpeg') {
            req.fileExtensionValidationError = true
            return cb(null, false, req.fileExtensionValidationError);
        }
        req.fileExtensionValidationError = false
        cb(null, true, req.fileExtensionValidationError);
    }
});
module.exports = upload