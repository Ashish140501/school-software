const Sequelize = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const{ User, School } = require('../models')

const enquiryCreateValidation = {
    enquiryDate: {
        exists: {
            errorMessage: "enquiryDate is required",
            options: { checkFalsy: true }
        },
        notEmpty: { errorMessage: "enquiryDate cannot be empty" },
        isString: { errorMessage: "enquiryDate should be string" },
        trim: true,
        isISO8601: {
            errorMessage: "enquiryDate format not supported"
        },
        toDate: true,
        escape: true,
    },
    name: {
        exists: {
            errorMessage: "name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "name cannot be empty" },
        isString: { errorMessage: "name should be string" },
        trim: true,
        escape: true,
    },
    lastName: {
        exists: {
            errorMessage: "last name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "last name cannot be empty" },
        isString: { errorMessage: "last name should be string" },
        trim: true,
        escape: true,
    },
    parentName: {
        exists: {
            errorMessage: "parent name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "parent name cannot be empty" },
        isString: { errorMessage: "parent name should be string" },
        trim: true,
        escape: true,
    },
    contactNo:{
        exists:{
            errorMessage: "contact number is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "contact number cannot be empty" },
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: "customer number should be 10 Digits",
        },
        trim: true,
        escape: true,
    },
    class:{
        exists:{
            errorMessage: "contact number is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "contact number cannot be empty" },
        isString: { errorMessage: "contact no should be string" },
        trim: true,
        escape: true,
    },     
    previousSchool:{
        optional: {},
        isString: { errorMessage: "previousSchool should be string"},
        trim: true,
        escape: true,
        errorMessage: "previousSchool should be 10 digits",
    },
    villageOrCity: {
        optional: {},
        isString: { errorMessage: "city name should be string" },
        trim: true,
        escape: true,
    },
    district: {
        optional: {},
        isString: { errorMessage: "district name should be string" },
        trim: true,
        escape: true,
    },
    followUpDate: {
        optional: {},
        isString: { errorMessage: "start date should be string" },
        trim: true,
        isISO8601: {
            errorMessage: "start date format not supported"
        },
        toDate: true,
        escape: true,
    },
    remarks: {
        optional: {},
        isString: { errorMessage: "remarks name should be string" },
        trim: true,
        escape: true,
    }
}

const enquiryUpdateValidation = {
    id:{
        exists:{
            errorMessage: "contact number is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "id should be in numeric" },
        isInt:{ errorMessage: "id should be integer" },
        trim: true,
        escape: true,
    },
    enquiryDate: {
        exists: {
            errorMessage: "enquiryDate is required",
            options: { checkFalsy: true }
        },
        notEmpty: { errorMessage: "enquiryDate cannot be empty" },
        isString: { errorMessage: "enquiryDate should be string" },
        trim: true,
        isISO8601: {
            errorMessage: "enquiryDate format not supported"
        },
        toDate: true,
        escape: true,
    },
    name: {
        exists: {
            errorMessage: "name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "name cannot be empty" },
        isString: { errorMessage: "name should be string" },
        trim: true,
        escape: true,
    },
    lastName: {
        exists: {
            errorMessage: "last name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "last name cannot be empty" },
        isString: { errorMessage: "last name should be string" },
        trim: true,
        escape: true,
    },
    parentName: {
        exists: {
            errorMessage: "parent name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "parent name cannot be empty" },
        isString: { errorMessage: "parent name should be string" },
        trim: true,
        escape: true,
    },
    contactNo:{
        exists:{
            errorMessage: "contact number is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "contact number cannot be empty" },
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: "customer number should be 10 Digits",
        },
        trim: true,
        escape: true,
    },
    class:{
        exists:{
            errorMessage: "contact number is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "contact number cannot be empty" },
        isString: { errorMessage: "contact no should be string" },
        trim: true,
        escape: true,
    },     
    previousSchool:{
        optional: {},
        isString: { errorMessage: "previousSchool should be string"},
        trim: true,
        escape: true,
        errorMessage: "previousSchool should be 10 digits",
    },
    villageOrCity: {
        optional: {},
        isString: { errorMessage: "city name should be string" },
        trim: true,
        escape: true,
    },
    district: {
        optional: {},
        isString: { errorMessage: "district name should be string" },
        trim: true,
        escape: true,
    },
    followUpDate: {
        optional: {},
        isString: { errorMessage: "start date should be string" },
        trim: true,
        isISO8601: {
            errorMessage: "start date format not supported"
        },
        toDate: true,
        escape: true,
    },
    remarks: {
        optional: {},
        isString: { errorMessage: "remarks name should be string" },
        trim: true,
        escape: true,
    },
}

const enquiryDeleteValidation = {
    id:{
        exists:{
            errorMessage: "id is required",
            options:{checkFalsy: true},
        },
        isArray: { errorMessage: "id should be in array" },
        trim: true,
        escape: true,
    },
}

module.exports = {
    enquiryCreateValidation,
    enquiryUpdateValidation,
    enquiryUpdateValidation,
    enquiryDeleteValidation
}