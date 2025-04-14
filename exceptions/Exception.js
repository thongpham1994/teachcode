import { print, OutputType } from '../helpers/printHelpper.js'


export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = `Wrong database's username and password`;
    static WRONG_DB_CONNECTION_STRING = `Wrong server name/connect string`;
    static WRONG_DB_CONNECT_MONGODB = `Cannot connect to Mongoose`;
    static USER_EXISTS = 'User already exists';
    static CANNOT_REGISTER_USER = 'Cannot register user';
    static WRONG_EMAIL_AND_PASSWORD = 'Wrong email or password';


    constructor(message, validationErrors = {}) {
        super(message) //Call constructor of parent class(Error)

        print(message, OutputType.ERROR)
        this.validationErrors = validationErrors
    }
}
