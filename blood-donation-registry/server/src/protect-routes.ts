import { expressjwt } from 'express-jwt';

//Check user token
export const checkUser = expressjwt({
    secret: 'mySecretKey',
    algorithms: ['HS256']
});

//If authorization error, send status 401
export const handleAuthorizationError = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ error: 'Authentication is required for this operation.' });
    } else {
        next(err);
    }
};
