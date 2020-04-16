const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    let token = req.headers['authorization'].replace('Bearer ', '');
    console.log(token)
/*    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }*/
    jwt.verify(token, 'rakib2015Salt', (err, decoded) => {
        if (err) {
            throw new Error(err.message);
        }
        if (decoded) {
            res.userId = decoded._id; //receive way from next function const id = req.userId
            next();
        }
    });
};
module.exports = auth;