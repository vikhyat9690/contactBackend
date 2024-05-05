const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) => {
    const token = NULL;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(401);
                throw new Error("Unauthorized user");
            }
        
            req.user = decoded.user;
            next();
        });
        if(!token) {
            res.status(401);
            throw new Error("User is not valid");
        }
    }
});

module.exports = validateToken;