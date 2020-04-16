const UserModel = require('../model/user');
const mailService = require('../utils/mail/mail_service');
const bcrypt = require('bcrypt');
const JwtToken = require('../utils/jwt/token_provider');
const getImage = require('../utils/image/get_image');
const deleteFile = require('../utils/image/delete_image');
module.exports = class UserService {
    async logIn(request, response) {
        try {
            let User = await UserModel.findOne({userEmail: request.body.userEmail});
            if (User !== null) {
                let userPass = User['password'];
                let compareSync = bcrypt.compareSync(request.body.password, userPass);
                if (compareSync) {
                    let token = await JwtToken({_id: User['_id']});
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
            userType: request.body.userType,
            image: request.file.path
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
//problem in upldate method
    async updateUser(id, request, response) {
        if (request.file.path !== null) {
            let userInfo = await UserModel.findById(id);
            if (userInfo !== null) {
                deleteFile(userInfo.image);
            }
        }

        await UserModel.findByIdAndUpdate(id, {$set: {userName: request.body.userName}}).then(result => {
            console.log(result);
            response.send(result);
        });
    }

    async getUser(request, response) {
        await UserModel.find({}).then(result => {
            let userList = [];
            result.forEach(user => {
                user['image'] = getImage(user['image']);
                delete user.password;
                userList.push(user);
            })
            response.send(userList);
        }).catch(e => {
            response.send(e);
        })
    }

    async getOneUser(id, request, response) {
        await UserModel.findById({'_id': id}).then(result => {
            result['image'] = getImage(result['image']);
            delete result.password;
            response.send(result);
        }).catch(e => {
            response.send(e);
        })

    };

    async deleteUser(id, request, response) {
        console.log(UserModel.countDocuments);
        await UserModel.findByIdAndDelete(id).then(result => {
            deleteFile(result.image);
            response.send(result);
            console.log(UserModel.countDocuments);
        }).catch(e => {
            response.send(e);
        })

    };
}