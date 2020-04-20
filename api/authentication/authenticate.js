const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const authToken = jwt.verify(request.body.token, process.env.JWT_KEY);
        request.authToken = authToken;
        next();
    } catch(error) {
        return response.status(401).json({
            message: "Auth failed"
        });
    }
}