import mongoose from 'mongoose'
import Exception from '../exceptions/Exception.js';
import { print, OutputType } from '../helpers/printHelpper.js'

async function connect() {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI);
        print('connect mongoose successfully', OutputType.SUCCESS);

        return connection;
    }
    catch (err) {
        const { code } = err;
        if (err.code == 8000) {
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
        } else if (code == 'ENOTFOUND') {
            throw new Exception(Exception.WRONG_DB_CONNECTION_STRING);
        }
        throw new Exception(Exception.WRONG_DB_CONNECT_MONGODB);
    }
}
export default connect

