const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    let token = req.headers['authorization']/*.replace('Bearer ', '')*/;
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    jwt.verify(token, 'rakib2015Salt', (err, decoded) => {
        if (err) {
            throw new Error(err.message);
        }
        if (decoded) {
            console.log(decoded._id);
            next();
        }
    });
};
module.exports = auth;