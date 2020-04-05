import HttpStatus from 'http-status-codes';

const {getEvenToken, decodeToken} = require('../utils/tokenUtils');

//module.exports to allow requireAuth to be called as a function
export function requireAuth(){
    const skipPaths = ['/api/auth/register', '/api/auth/login'];

    return (req:any, res:any, next:any) => {
        if (skipPaths.includes(req.path)) {
            return next();
        }

        try {
            const token = getEvenToken(req);

            if (token) {
                // verify if the token is authentic
                try{
                    //console.log(decoded);
                req.user = decodeToken(token, process.env.JWT_SECRET);
                return next();
                } catch (error) {
                    return res.status(HttpStatus.UNAUTHORIZED).json({
                        success: false,
                        message: 'You have an issue with your authorization token',
                    });
                }
            }

            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'You must have an authorization token',
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
            });
        }
    };
}