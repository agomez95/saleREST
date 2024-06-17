const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env.config');

module.exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

 module.exports.comparePassword = async (password, passwordRecived) => {
    return await bcrypt.compare(password, passwordRecived);
};

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

module.exports.makeNumeration = (number) => {
    if (number === 0) return String(number + 1).padStart(2, '0'); // Asegurar que el número tenga dos dígitos

    return String(number).padStart(2, '0');
};