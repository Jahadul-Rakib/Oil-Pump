const express = require('express');
let router = express.Router();

const UserService = require('../service/user-service');
const user = new UserService();
const auth = require('../utils/jwt/token_filter');
const upload = require('../utils/image/save_image');

router.post('/', upload.single( 'file') , (request, response) => {
    user.saveUser(request, response);
});
router.put('/:id', auth, upload.single( 'file'), (request, response) => {
    user.updateUser(request.params.id, request, response);
});
router.get('/', auth, (request, response) => {
    user.getUser(request, response);
});
router.get('/:id', auth, (request, response) => {
    user.getOneUser(request.params.id, request, response);
});
router.delete('/:id', auth, (request, response) => {
    user.deleteUser(request.params.id, request, response);
});

router.post('/login', (request, response) => {
    user.logIn(request, response);
});
module.exports = router;