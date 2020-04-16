const fs = require('fs');
const string = require("sharp");
const getImage = function getImage(imageId) {
    let img = fs.readFileSync(imageId);
    let imageType;
    if (imageId.endsWith('.PNG')) {
        imageType = 'png'
    } else if (imageId.endsWith('.jpg')) {
        imageType = 'jpg'
    } else if (imageId.endsWith('.jpeg')) {
        imageType = 'jpeg'
    } else {
        throw new Error('Unsupported image type');
    }
    let image = `data:image/${imageType};base64,` + img.toString('base64');
    return image;
}

module.exports = getImage;