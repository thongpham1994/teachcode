import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import jwt from 'jsonwebtoken';


export default function checkToken(req, res, next) {
    //Bypass login and register

    if (req.url.toLowerCase().trim() == '/users/login'.toLowerCase().trim() ||
        req.url.toLowerCase() == '/users/register'.toLowerCase().trim()) {
        next()
        return
    }
    
    const token = req.headers?.authorization?.split(" ")[1];
    try {
        const jwtObj = jwt.verify(token, process.env.JWT_SECRET);
        const isExpired = Date.now() >= jwtObj.exp * 1000;
        if(isExpired){
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: 'Token is expired'
            })
            res.end();
        }
        else {
            next()
            return
        }

        
    }
    catch (exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.message
        })
    }

}