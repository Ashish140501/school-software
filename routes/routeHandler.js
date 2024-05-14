const passport = require('passport');
const createError = require('http-errors');
const express = require('express');
const routerHandler = express.Router();

const applyPassportStrategy = require('../config/passportConfig');
applyPassportStrategy(passport);

const adminRouter = require('./adminRouter');
const schoolRouter = require('./schoolRouter')
// const superRouter = require('./superRouter')

routerHandler.use('/admin', adminRouter);
routerHandler.use('/school', passport.authenticate('jwt', { session: false }), schoolRouter);
// routerHandler.use('/super', superRouter);

routerHandler.use((req,res,next)=>{
  console.log("came");
  console.log(req);
    next(createError(404,"Not found"));
});

module.exports=routerHandler;