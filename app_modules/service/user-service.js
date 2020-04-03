const UserModel = require('../model/user');
const mailService = require('../utils/mail_service');
module.exports = class UserService {
    async saveUser(request, response) {
        try {
            const user = new UserModel({
                userName: request.body.userName,
                userEmail: request.body.userEmail,
                password: request.body.password,
                phoneNumber: request.body.phoneNumber,
                userType: request.body.userType
            });
            let newVar = await user.save();
            if (newVar) {
                mailService.sendMail(user['userEmail']);
            }
            response.status(200).send(newVar);
        } catch (e) {
            response.status(500).send(e);
        }
    }
}