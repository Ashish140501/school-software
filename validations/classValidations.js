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
        isNumeric: { errorMessage: "status should be in numeric" },
        isInt:{ errorMessage: "status should be integer" },
        trim: true,
        escape: true,
    },
    'sectionList.*.id':{
        exists:{
            errorMessage: "section id is required",
            options:{checkFalsy: true},
        },
        isInt: { errorMessage: "section id should be in number" },
        trim: true,
        escape: true,
    },
    'sectionList.*.section':{
        exists:{
            errorMessage: "section is required",
            options:{checkFalsy: true},
        },
        isString: { errorMessage: "section should be in array" },
        trim: true,
        escape: true,
    },
    'sectionList.*.status': {
        exists: {
            errorMessage: "Status is required",
            options: { checkFalsy: false },
        },
        notEmpty: { errorMessage: "status cannot be empty" },
        isNumeric: { errorMessage: "invalid status" },
        escape: true,
        isInt: {
            options: [[0, 1]],
            errorMessage: 'only either 0 or 1'
        },
    },
}

module.exports = {
    classCreateValidation,
    classUpdateValidation,
}