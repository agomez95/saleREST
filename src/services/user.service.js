const jwt = require('jsonwebtoken');

const pgConnection = require('../common/pgConnection');

const { CustomError, UnauthorizedError, BadRequestError } = require('../utils/moduleError');

const { encryptPassword, comparePassword } = require('../utils/users/cryptPassword');
const { makeToken } = require('../utils/users/makeToken');

const userQuery = require('../utils/querys/user.query');

const addUserClientService = async (data) => {
    const pgDB = new pgConnection();

    const { firstname, lastname, email, password, type } = data;
    
    try {
        let message = 'SUCCES';
        await pgDB.query('BEGIN');

        let username = firstname.toLowerCase().charAt(0) + lastname.toLowerCase().split(' ')[0] + lastname.toLowerCase().split(' ')[1].charAt(0)

        const user = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: await encryptPassword(password),
            email: email
        };

        const result = await pgDB.selectFunction(userQuery.addUserClient, user);

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO SAVE DATA');

        if (result.length === 0) message = 'NO CONTENT'; 

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'signUpService',
            message: message,
            user_id: result[0]
        };

        return { response: response };
    } catch (error) {
        await pgDB.query('ROLLBACK');
        throw error;
    } finally {
        pgDB.close();
    }
};

const addUserAdminService = async (data) => {
    const pgDB = new pgConnection();

    const { firstname, lastname, email, password, type } = data;
    
    try {
        let message = 'SUCCES';
        await pgDB.query('BEGIN');

        let username = firstname.toLowerCase().charAt(0) + lastname.toLowerCase().split(' ')[0] + lastname.toLowerCase().split(' ')[1].charAt(0)

        const user = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: await encryptPassword(password),
            email: email
        };

        const result = await pgDB.selectFunction(userQuery.addUserAdmin, user);

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO SAVE DATA');

        if (result.length === 0) message = 'NO CONTENT'; 

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'signUpService',
            message: message,
            user_id: result[0]
        };

        return { response: response };
    } catch (error) {
        await pgDB.query('ROLLBACK');
        throw error;
    } finally {
        pgDB.close();
    }
};

const signUpService = async (data) => {
    const pgDB = new pgConnection();

    const { firstname, lastname, email, password, type } = data;
    
    try {
        let message = 'SUCCES';
        await pgDB.query('BEGIN');

        let username = firstname.toLowerCase().charAt(0) + lastname.toLowerCase().split(' ')[0] + lastname.toLowerCase().split(' ')[1].charAt(0)

        const user = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: await encryptPassword(password),
            email: email,
            type: type
        };

        const result = await pgDB.selectFunction(userQuery.signupUser, user);

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO SAVE DATA');

        if (result.length === 0) message = 'NO CONTENT'; 

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'signUpService',
            message: message,
            user_id: result[0]
        };

        return { response: response };
    } catch (error) {
        await pgDB.query('ROLLBACK');
        throw error;
    } finally {
        pgDB.close();
    }
};

const signInService = async (data) => {
    const pgDB = new pgConnection();

    const { username, password } = data;

    try {
        let message = 'SUCCES';
        await pgDB.query('BEGIN');

        // GET USER
        const result = await pgDB.query(userQuery.signinUser, [ username ]);

        if (result.length === 0) throw new BadRequestError('USER NOT FOUND');

        // COMPARE PASSWORD
        const matchPassword = await comparePassword(password, result[0]['password']);

        if(!matchPassword) throw new UnauthorizedError(`PASSWORD DOESN'T MATCH`);

        await pgDB.query('COMMIT');

        // TOKEN
        const token = makeToken(result[0]);

        const response = {
            status: 200,
            service: 'signInService',
            message: message,
            token: token
        };

        return { response: response };
    } catch (error) {
        await pgDB.query('ROLLBACK');
        throw error;
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