const express = require('express');
const router = express.Router();

//--controllers--//
const {
    superRegisterService,
    superLoginService
} = require('../../controllers/super');


//--validations--//
const {
    superUserRegisterValidation,
    superUserLoginValidation
} = require('../../validations/superValidations');
const { checkSchema } = require('express-validator');

//--auth-routes--//
router.post('/register', checkSchema(superUserRegisterValidation), (req, res, next) => {
    superRegisterService(req, res, next)
})

router.post('/login', checkSchema(superUserLoginValidation), (req, res, next) => {
    superLoginService(req, res, next)
})


module.exports = router;