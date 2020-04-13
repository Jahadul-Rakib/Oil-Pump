const UserModel = require('../model/user');
const mailService = require('../utils/mail_service');
const bcrypt = require('bcrypt');
const JwtToken = require('../utils/token_filter');
module.exports = class UserService {

    async logIn(request, response) {
        try {
            let User = await UserModel.findOne({userEmail: request.body.userEmail});
            if (User !== null) {
                let userPass = User['password'];
                let compareSync = bcrypt.compareSync(request.body.password, userPass);
                if (compareSync) {
                    let token = await  JwtToken.createToken({_id: User['userEmail']});
                    response.send(token);
                } else {
                    response.send('wrong credintials');
                }
            } else {
                response.send('User Email Not exist');
            }


        } catch (e) {
            response.send(e.toString());
        }
    };

    async saveUser(request, response) {

        const user = new UserModel({
            userName: request.body.userName,
            userEmail: request.body.userEmail,
            password: request.body.password,
            phoneNumber: request.body.phoneNumber,
            userType: request.body.userType
        });
        UserModel.findOne({userEmail: request.body.userEmail}).then(async r => {
            if (r) {
                return response.send('User Email Already Exist !!')
            }
            let newVar = await user.save();
            if (newVar) {
                mailService.sendMail(user['userEmail']);
            }
            return response.status(200).send(newVar);
        }).catch(e => {
            response.send(e);
        });


    }

    async updateUser(id, request, response) {
        await UserModel.findByIdAndUpdate(id, {$set: {userName: request.body.userName}}).then(result => {
            console.log(result);
            response.send(result);
        });
    }

    async getUser(request, response) {
        await UserModel.find({}).then(result => {
            response.send(result);
        }).catch(e => {
            response.send(e);
        })
    }

    async getOneUser(id, request, response) {
        await UserModel.findById({'_id': id}).then(result => {
            response.send(result);
        }).catch(e => {
            response.send(e);
        })

    };

    async deleteUser(id, request, response) {
        console.log(UserModel.countDocuments);
        await UserModel.findByIdAndDelete(id).then(result => {
            response.send(result);
            console.log(UserModel.countDocuments);
        }).catch(e => {
            response.send(e);
        })

    };
}