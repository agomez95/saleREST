const jwt = require('jsonwebtoken');

const pgConnection = require('../../db/connection.db');

const { UnauthorizedError} = require('../../errors/httpError');
const moduleErrorHandler = require('../../common/moduleError');

const { encryptPassword, comparePassword, makeToken } = require('../../common/utils');

const { HTTP_RESPONSES } = require('../../common/constans');

const { user } = require('../../db/querys.db');

const addUserClientService = async (data) => {
    const pgDB = new pgConnection();

    const { firstname, lastname, email, password } = data;
    
    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            let username = firstname.toLowerCase().charAt(0) + lastname.toLowerCase().split(' ')[0] + lastname.toLowerCase().split(' ')[1].charAt(0)

            const newUser = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: await encryptPassword(password),
                email: email
            };
    
            result = await pgDB.selectFunction(user.addUserClient, newUser);
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addUserClientService',
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

            const newUser = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: await encryptPassword(password),
                email: email
            };
    
            result = await pgDB.selectFunction(user.addUserAdmin, newUser);
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: HTTP_RESPONSES.CREATED,
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

            const newUser = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: await encryptPassword(password),
                email: email,
                type: type
            };
    
            result = await pgDB.selectFunction(user.signupUser, newUser);    
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: HTTP_RESPONSES.CREATED,
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

        result = await pgDB.query(user.signinUser, [ username ]).catch((error) => { throw error; });

        // COMPARE PASSWORD
        const matchPassword = await comparePassword(password, result[0]['password']);
        
        if(!matchPassword) throw new UnauthorizedError(HTTP_RESPONSES.UNAUTHORIZED, `ERROR: PASSWORD DOESN'T MATCH`, '08006');

        // TOKEN
        const token = makeToken(result[0]);

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
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