const passport = require('passport');
const applyPassportStrategy = require('../config/passportConfig');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const { query, body, checkSchema } = require('express-validator');

const router = express.Router();

const {
    schoolOnBoardValidation,
    schoolLoginValidation,
    schoolEditValidation
} = require('../validations/adminValidations');

const {
    schoolOnboardService,
    schoolLoginService,
    schoolForgetPasswordService,
    schoolResetPasswordService,
    schoolUpdateService
} = require('../controllers/admin/adminController');

router.post('/school/onboard', checkSchema(schoolOnBoardValidation), (req, res, next) => {
    schoolOnboardService(req, res, next);
});

router.post('/school/login', schoolLoginValidation, (req, res, next) => {
    schoolLoginService(req, res, next);
});

router.post('/school/forget-password', (req, res, next) => {
    schoolForgetPasswordService(req, res, next);
});

router.post('/school/reset-password', (req, res, next) => {
    schoolResetPasswordService(req, res, next);
});

router.put('/school/edit', schoolEditValidation, (req, res, next) => {
    schoolUpdateService(req, res, next)
})

router.use((req, res, next) => {
    console.log("came");
    next(createError(404, "Not found1"));
});


module.exports = router;