const jwt = require('jsonwebtoken');

// JWT secret key 
const jwtSecret = process.env.JWTSECRET;


function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, jwtSecret);
        console.log(decoded,"i am dexoded")
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;
