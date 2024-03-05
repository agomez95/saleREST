const jwt = require('jsonwebtoken');
const config = require('../../config/main.config');

module.exports.makeToken = (user) => {
    const userToken = {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        type: user.type,
        state: user.state
    };

    return jwt.sign(userToken, config.ACCESS_SECRET, { expiresIn: '1h' });
};