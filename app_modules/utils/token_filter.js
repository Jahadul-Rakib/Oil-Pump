const jwt = require('jsonwebtoken');

module.exports = class TokenService {
    async createToken(data) {
        return jwt.sign(data, 'rakib2015Salt');
    }
    async tokenVerify(token) {
        return jwt.verify(token, 'rakib2015Salt');
    }
}