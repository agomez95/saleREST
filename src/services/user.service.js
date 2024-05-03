const jwt = require('jsonwebtoken');

const pgConnection = require('../common/pgConnection');

const { UnauthorizedError} = require('../utils/httpError');
const moduleErrorHandler = require('../utils/moduleError');

const { encryptPassword, comparePassword } = require('../utils/users/cryptPassword');
const { makeToken } = require('../utils/users/makeToken');

const userQuery = require('../utils/querys/user.query');

const addUserClientService = async (data) => {
    const pgDB = new pgConnection();

    const { firstname, lastname, email, password } = data;
    
    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            let username = firstname.toLowerCase().charAt(0) + lastname.toLowerCase().split(' ')[0] + lastname.toLowerCase().split(' ')[1].charAt(0)

            const user = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: await encryptPassword(password),
                email: email
            };
    
            result = await pgDB.selectFunction(userQuery.addUserClient, user);
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'signUpService',
            message: message,
            user_id: result[0]
        };

        return { response: response };
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const addUserAdminService = async (data) => {
    const pgDB = new pgConnection();

    const { firstname, lastname, email, password } = data;
    
    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');
        
        try {
            let username = firstname.toLowerCase().charAt(0) + lastname.toLowerCase().split(' ')[0] + lastname.toLowerCase().split(' ')[1].charAt(0)

            const user = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: await encryptPassword(password),
                email: email
            };
    
            result = await pgDB.selectFunction(userQuery.addUserAdmin, user);
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addUserAdminService',
            user_id: result[0]
        };

        return { response: response };
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const signUpService = async (data) => {
    const pgDB = new pgConnection();

    const { firstname, lastname, email, password, type } = data;
    
    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            let username = firstname.toLowerCase().charAt(0) + lastname.toLowerCase().split(' ')[0] + lastname.toLowerCase().split(' ')[1].charAt(0)

            const user = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: await encryptPassword(password),
                email: email,
                type: type
            };
    
            result = await pgDB.selectFunction(userQuery.signupUser, user);    
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'signUpService',
            user_id: result[0]
        };

        return { response: response };
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const signInService = async (data) => {
    const pgDB = new pgConnection();

    const { username, password } = data;

    let result;

    try {
        await pgDB.connect();

        result = await pgDB.query(userQuery.signinUser, [ username ]).catch((error) => { throw error; });

        // COMPARE PASSWORD
        const matchPassword = await comparePassword(password, result[0]['password']);
        
        if(!matchPassword) throw new UnauthorizedError(409, `ERROR: PASSWORD DOESN'T MATCH`, '08006');

        // TOKEN
        const token = makeToken(result[0]);

        const response = {
            status: 200,
            service: 'signInService',
            token: token
        };

        return { response: response };
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};


module.exports = {
    addUserClientService,
    addUserAdminService,
    signUpService,
    signInService
};