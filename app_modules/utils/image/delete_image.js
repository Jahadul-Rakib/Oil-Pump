const fs = require('fs');
const deleteImages = function (filePath) {
    fs.unlinkSync(filePath);
}
module.exports = deleteImages;