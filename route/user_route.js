const express = require('express');
let router = express.Router();

const UserService = require('../service/user-service');
const user = new UserService();

router.post('/',async (request, response) => {
    await user.saveUser(request, response);
});

module.exports = router;