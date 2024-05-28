const express = require('express');
const Passport = require('passport').Passport;
const superRouter = express.Router();
const superPassport = new Passport();

superRouter.use(superPassport.initialize());

const applySuperPassportStrategy = require('../../config/superPassportConfig');
applySuperPassportStrategy(superPassport);

const verifiedRouter = require('./verifiedRouter');
const authRouter = require('./authRouter');

superRouter.use('/v', superPassport.authenticate('jwt', { session: false }), verifiedRouter);
superRouter.use('/auth', authRouter);

superRouter.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Super Admin endpoint!",
        data: {
            verified: "/v",
            authentication: "/auth"
        }
    });
});


superRouter.use((req, res, next) => {
    next(createError(404, "Not found"));
});

module.exports = superRouter;
