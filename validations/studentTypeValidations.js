const Sequelize = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const{ studentType } = require('../models');
const { isString } = require('util');
const { transportCreate } = require('../controllers/settings/transportController');

const studentTypeCreateValidation = {
    studentType:{
        exists:{
            errorMessage: "studentType is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "studentType cannot be empty" },
        isString: { errorMessage: "studentType should be string" },
        trim: true,
        escape: true,
    },      
}

const studentTypeUpdateValidation = {
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
    studentType:{
        exists:{
            errorMessage: "studentType is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "studentType cannot be empty" },
        isString: { errorMessage: "studentType should be string" },
        trim: true,
        escape: true,
    },
}

module.exports = {
    studentTypeCreateValidation,
    studentTypeUpdateValidation,
}