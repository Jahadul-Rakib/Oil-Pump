const UserModel = require('../model/user');
const mailService = require('../utils/mail_service');
module.exports = class UserService {
    async saveUser(request, response) {
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
    }

    async updateUser( id, request, response) {
            await UserModel.findByIdAndUpdate(id, {$set: {userName: request.body.userName}}).then(result=>{
                console.log(result);
                response.send(result);
            });
    }

    async getUser(request, response) {
            await UserModel.find({}).then(result =>{
                response.send(result);
            }).catch(e=>{
                response.send(e);
            })
    }
    async getOneUser(id , request, response){
            await UserModel.findById({'_id': id}).then(result=>{
                response.send(result);
            }).catch(e=>{
                response.send(e);
            })
        
    };
}