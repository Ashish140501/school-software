const createError = require('http-errors');
const express = require('express');
const routerHandler = express.Router();
const Passport = require('passport').Passport;
const schoolPassport = new Passport();

routerHandler.use(schoolPassport.initialize());

const applyPassportStrategy = require('../config/passportConfig');
applyPassportStrategy(schoolPassport);

const adminRouter = require('./adminRouter');
const schoolRouter = require('./schoolRouter');

routerHandler.use('/admin', adminRouter);
routerHandler.use('/school', schoolPassport.authenticate('jwt', { session: false }), schoolRouter);

routerHandler.use((req, res, next) => {
    next(createError(404, "Not found"));
});

module.exports = routerHandler;