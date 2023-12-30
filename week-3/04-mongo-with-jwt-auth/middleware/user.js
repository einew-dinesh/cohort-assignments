const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected\
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    jwt.verify(jwtToken,'secret', function (err, decoded){
        
        if (err){
            console.log(err);
            res.json({
                message:"Not authorizesed to access;"
            })
        } else {
            req.headers.username = decoded;
            next();
        }
    });
}

module.exports = userMiddleware;