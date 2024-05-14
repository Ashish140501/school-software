const express = require('express');
const passport = require('passport');
const superRouter = express.Router();

const applySuperPassportStrategy = require('../../config/superPassportConfig');
applySuperPassportStrategy(passport);

const verifiedRouter = require('./verifiedRouter');
const authRouter = require('./authRouter');

superRouter.use('/v', passport.authenticate('jwt', { session: false }), verifiedRouter);
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

module.exports = superRouter;
