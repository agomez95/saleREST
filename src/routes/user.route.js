'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// const validate = require('../middlewares/schema.middleware');
// const { signUp, signIn } = require('../schemas/auth.schema')

router
    .post('/client/add', userController.addUserClientController)
    .post('/admin/add', userController.addUserAdminController)
    .post('/signup', userController.signUpController)
    .post('/signin', userController.signInController)

module.exports = router;