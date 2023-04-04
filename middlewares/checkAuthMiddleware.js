const { verifyJwtToken } = require("../services/authService");

const checkAuthMiddleware = (req, res, next) => {
    const {authorization} = {...req.headers};
    if(!authorization){
        return res.status(401).json({
            error: "Authentication token is required"
        });
    }
    try{
        const token = authorization.split(' ')[1];
        const {_id} = verifyJwtToken(token);
        req.userId = _id;
        next();
    }
    catch(e){
        res.status(401).json({
            error: "Authentication failed"
        });
    }
}

module.exports = checkAuthMiddleware;