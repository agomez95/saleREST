const userService = require('../services/user.service');

const addUserClientController = async (req, res, next) => {
    try {    
        const response = await userService.addUserClientService(req.body);
    
        res.status(response.response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const addUserAdminController = async (req, res, next) => {
    try {    
        const response = await userService.addUserAdminService(req.body);
    
        res.status(response.response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const signUpController = async (req, res, next) => {
    try {    
        const response = await userService.signUpService(req.body);
    
        res.status(response.response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const signInController = async (req, res, next) => {
    try {    
        const response = await userService.signInService(req.body);
    
        res.status(response.response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const logOutController = async (req, res, next) => {

};

module.exports = {
    addUserClientController,
    addUserAdminController,
    signUpController,
    signInController,
    logOutController
};