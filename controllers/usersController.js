//function login(req, res)
import { body, validationResult } from 'express-validator';
import { EventEmitter } from 'node:events';
import {
    userRepository,
    studentRepository
} from '../repositories/index.js';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import Exception from '../exceptions/Exception.js';


//#region Event
const myEvent = new EventEmitter();
//listen event
myEvent.on('event.register.user', (params) => {
    console.log(`They takeed about: ${JSON.stringify(params)}`);
});
//#endregion

//#region  Login
const login = async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ erros: erros.array() });
    };
    const { email, password } = req.body;
    try {
        //call repository
        let existingUser = await userRepository.login({ email, password });
        //response result
        res.status(HttpStatusCode.OK).json({
            message: 'Login user successfully',
            data: existingUser
        });
    }
    catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        })
    }
}
//#endregion

//#region Register
const register = async (req, res) => {
    const {
        name,
        userName,
        email,
        password,
        phoneNumber,
        address
    } = req.body;
    //event emitter
    myEvent.emit('event.register.user', req.body);
    try {
        //insert repositories
        const user = await userRepository.register({ name, password, phoneNumber, userName, email, address });
        //response result
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Register user successfully',
            data: user
        });
    }
    catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        })
    }
}
//#endregion

//#region Get Details User
const getDetailUrser = async (req, res) => {

}
//#endregion

export default {
    login,
    register,
    getDetailUrser
}