const Sequelize = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const{ Transpost } = require('../models');
const { isString } = require('util');
const { transportCreate } = require('../controllers/settings/transportController');

const transportCreateValidation = {
    pickUp:{
        exists:{
            errorMessage: "pickUp is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "pickUp cannot be empty" },
        isString: { errorMessage: "pickUp should be string" },
        trim: true,
        escape: true,
    },
    distance:{
        exists:{
            errorMessage: "distance is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "distance cannot be empty" },
        isString: { errorMessage: "distance should be in string" },
        trim: true,
        escape: true,
    },
    amount:{
        exists:{
            errorMessage: "amount is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "amount cannot be empty" },
        isString: { errorMessage: "amount should be in string" },
        trim: true,
        escape: true,
    },       
}

const transportUpdateValidation = {
    id:{
        exists:{
            errorMessage: "id is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "id should be in numeric" },
        isInt:{ errorMessage: "id should be integer" },
        trim: true,
        escape: true,
    },
    pickUp:{
        exists:{
            errorMessage: "pickUp is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "pickUp cannot be empty" },
        isString: { errorMessage: "pickUp should be string" },
        trim: true,
        escape: true,
    },
    distance:{
        exists:{
            errorMessage: "distance is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "distance cannot be empty" },
        isString: { errorMessage: "distance should be in string" },
        trim: true,
        escape: true,
    },
    amount:{
        exists:{
            errorMessage: "amount is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "amount cannot be empty" },
        isString: { errorMessage: "amount should be in string" },
        trim: true,
        escape: true,
    },
}

module.exports = {
    transportCreateValidation,
    transportUpdateValidation,
}