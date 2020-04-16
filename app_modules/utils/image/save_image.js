const multer = require('multer');
var  uuid = require('uuid');
var fileUpload = multer.diskStorage({
    destination: './images',
    filename(req, file, callback) {

        if (!file.originalname === '.jpg' || '.jpeg' || '.PNG') {
            new Error('Only Support JPG Or JPEG file.');
        }
        callback(null, Date.now() + '_' + uuid.v1() + '_' + file.originalname);
    }
});

var upload = multer({storage: fileUpload});
module.exports = upload;