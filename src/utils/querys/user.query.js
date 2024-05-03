'use strict';

const addUserAdmin = 'addUserAdmin';
const addUserClient = 'addUserClient';
const signupUser = 'signupUser';
const signinUser = 'SELECT * FROM signinUser($1)';

module.exports = {
    addUserAdmin,
    addUserClient,
    signupUser,
    signinUser
}