//const UserModel = require('../models/userModel.js')
import { print, OutputType } from '../helpers/printHelpper.js';
import { User } from '../models/index.js';
import Exception from '../exceptions/Exception.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//#region Login
const login = async ({ email, password }) => {
    print(`login user in user repository`, OutputType.INFORMATION);
    const existingUser = await User.findOne({ email: email }).exec();
    //Check not null
    if (existingUser) {
        let isMatch = await bcrypt.compare(password, existingUser.password);
        if (!!isMatch) {
            //Create Json Web Token
            let token = jwt.sign({
                data: existingUser,
            }, process.env.JWT_SECRET,
                {
                    //expiresIn: '60',
                    expiresIn: '30 days',
                }
            )
            //clone an add more properties
            return {
                ...existingUser.toObject(),
                password: "Not show",
                token: token
            }
        } else {
            throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
        }
    }
    else {
        throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
    }
}
//#endregion

//#region Register
const register = async ({
        name,
        userName,
        email,
        password,
        phoneNumber,
        address
    }) => {
    //Validation allready User
    //Encrypt password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    //Insert user to database
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address
    })
    return {
        ...newUser._doc,
        password: "Not show",
    }
    // print(`register user with: name: ${name},
    //                                 user_name: ${userName},
    //                                 password: ${password},
    //                                 email: ${email},
    //                                 phone_number: ${phoneNumber}
    //                                 address: ${address}`, OutputType.INFORMATION);
}
//#endregion

export default {
    login,
    register
}