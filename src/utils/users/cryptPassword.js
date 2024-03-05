const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, passwordRecived) => {
    return await bcrypt.compare(password, passwordRecived);
};

module.exports = {
    encryptPassword,
    comparePassword
};