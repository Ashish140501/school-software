const Sequelize = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const{ User, Class } = require('../models')

const classCreateValidation = {
    'data.*.class':{
        exists:{
            errorMessage: "class is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "class cannot be empty" },
        isString: { errorMessage: "class should be string" },
        trim: true,
        escape: true,
    },
    'data.*.sections':{
        exists:{
            errorMessage: "section is required",
            options:{checkFalsy: true},
        },
        isArray: { errorMessage: "section should be in array" },
        trim: true,
        escape: true,
    },       
}

const classUpdateValidation = {
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
    class:{
        exists:{
            errorMessage: "class is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "class cannot be empty" },
        isString: { errorMessage: "class should be string" },
        trim: true,
        escape: true,
    },
    status:{
        exists:{
            errorMessage: "status is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "status be in numeric" },
        isInt:{ errorMessage: "status be integer" },
        trim: true,
        escape: true,
    },
}

module.exports = {
    classCreateValidation,
    classUpdateValidation,
}