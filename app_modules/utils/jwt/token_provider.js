const jwt = require('jsonwebtoken');
const createToken = (data) => {
    return jwt.sign(data, 'rakib2015Salt', {/*algorithm: 'RS256', */expiresIn: '30 days'});
}

module.exports = createToken;