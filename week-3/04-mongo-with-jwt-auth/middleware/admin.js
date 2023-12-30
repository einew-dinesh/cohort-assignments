// Middleware for handling auth
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    jwt.verify(jwtToken, 'secret', function (err, decoded){
        
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

module.exports = adminMiddleware;