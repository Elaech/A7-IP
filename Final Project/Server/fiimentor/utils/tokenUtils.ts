import jwt from 'jsonwebtoken';

export function createToken(payload:any, secret:any){
    //signing the user with a jwt_secret
    return new Promise(function(resolve, reject){
        jwt.sign({payload}, secret , { expiresIn: '7d' }, (err, token) => {
            //returning the bearer token
            if(err)reject(err);
            resolve(token);
        });
    });
}
export function getEvenToken(req:any){
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1];
    }

    if (req.params && req.params.token) {
        return req.params.token;
    }
    return null;
}

export function decodeToken(token: any, secret:any){
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw error;
    }
}