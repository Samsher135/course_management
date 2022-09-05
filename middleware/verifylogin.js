const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {jsonResponse} = require('../controller/commonController');

// Set up Global configuration access
dotenv.config();

module.exports = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                jsonResponse(res, "error", "Access Denied");
                return;
            }
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            jsonResponse(res, "error", error);
        }
    }
}