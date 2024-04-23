const Sequelize = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const{ User, TableList } = require('../models')

const tableListCreateValidation = {
    'tableName':{
        exists:{
            errorMessage: "table name is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "table name cannot be empty" },
        isString: { errorMessage: "table name should be string" },
        trim: true,
        escape: true,
    },
    'list.*.field':{
        exists:{
            errorMessage: "class is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "class cannot be empty" },
        isString: { errorMessage: "class should be string" },
        trim: true,
        escape: true,
    },
    'list.*.status':{
        exists:{
            errorMessage: "table name is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "status should be in numeric" },
        isInt:{ errorMessage: "status should be integer" },
        trim: true,
        escape: true,
    },
    'list.*.default':{
        exists:{
            errorMessage: "table name is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "class cannot be empty" },
        isString: { errorMessage: "class should be string" },
        trim: true,
        escape: true,
    },       
}

const tableListUpdateValidation = {
    'list.*.id':{
        exists:{
            errorMessage: "id is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "id should be numeric" },
        isInt:{ errorMessage: "id should be integer" },
        trim: true,
        escape: true,
    },
    'list.*.tableName':{
        exists:{
            errorMessage: "table Name is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "table Name cannot be empty" },
        isString: { errorMessage: "table Name should be string" },
        trim: true,
        escape: true,
    },
    'list.*.list.*.field':{
        exists:{
            errorMessage: "field is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "field cannot be empty" },
        isString: { errorMessage: "field should be string" },
        trim: true,
        escape: true,
    },
    'list.*.list.*.status':{
        exists:{
            errorMessage: "status is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "status should be in numeric" },
        isInt:{ errorMessage: "status should be integer" },
        trim: true,
        escape: true,
    },
    'list.*.list.*.default':{
        exists:{
            errorMessage: "default is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "default cannot be empty" },
        isString: { errorMessage: "default should be string" },
        trim: true,
        escape: true,
    },       
}

module.exports = {
    tableListCreateValidation,
    tableListUpdateValidation
}