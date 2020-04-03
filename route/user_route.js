const express = require('express');
let router = express.Router();

const UserService = require('../service/user-service');
const user = new UserService();

router.post('/', (request, response) => {
     user.saveUser(request, response);
});

module.exports = router;