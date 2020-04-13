const jwt = require('jsonwebtoken');

module.exports.createToken = function (data) {
    return jwt.sign(data, 'rakib2015Salt', {/*algorithm: 'RS256', */expiresIn: '30 days'});
}

module.exports.auth = function (request, response, next) {
    const token = request.headers('Authorization').replace('Bearer ', '');
    jwt.verify(token, 'rakib2015Salt', (err, decoded) => {
        if (err) {
            throw new Error(err.message);
        }
        if (decoded) {
            console.log(decoded._id);
            next();
        }
    });
}