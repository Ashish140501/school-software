const Sequelize = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const { User, School } = require('../models');
const { isString } = require('util');
const { options } = require('../routes/adminRouter');

const studentCreateValidation = {
    session: {
        exists: {
            errorMessage: "session is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "session cannot be empty" },
        isString: { errorMessage: "session should be string" },
        trim: true,
        escape: true,
    },
    admissionDate: {
        exists: {
            errorMessage: "admissionDate is required",
            options: { checkFalsy: true }
        },
        notEmpty: { errorMessage: "admissionDate cannot be empty" },
        isString: { errorMessage: "admissionDate should be string" },
        trim: true,
        isISO8601: {
            errorMessage: "admissionDate format not supported"
        },
        toDate: true,
        escape: true,
    },
    admissionNo: {
        exists: {
            errorMessage: "admissionNo is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "admissionNo cannot be empty" },
        isString: { errorMessage: "admissionNo should be string" },
        trim: true,
        escape: true,
    },
    rollNo: {
        exists: {
            errorMessage: "rollNo is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "rollNo cannot be empty" },
        isString: { errorMessage: "rollNo should be string" },
        trim: true,
        escape: true,
    },
    firstName: {
        exists: {
            errorMessage: "firstName is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "firstName cannot be empty" },
        isString: { errorMessage: "firstName should be string" },
        trim: true,
        escape: true,
    },
    lastName: {
        optional: {},
        isString: { errorMessage: "lastName should be string" },
        trim: true,
        escape: true,
    },
    classId: {
        exists:{
            errorMessage: "classId is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "classId should be in numeric" },
        isInt:{ errorMessage: "classId should be integer" },
        trim: true,
        escape: true,
    },
    sectionId: {
        exists:{
            errorMessage: "sectionId is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "sectionId should be in numeric" },
        isInt:{ errorMessage: "sectionId should be integer" },
        trim: true,
        escape: true,
    },
    fatherName: {
        exists: {
            errorMessage: "fatherName is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "fatherName cannot be empty" },
        isString: { errorMessage: "fatherName should be string" },
        trim: true,
        escape: true,
    },
    contactNo: {
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
    gender: {
        optional: {},
        isString: { errorMessage: "gender should be string" },
        trim: true,
        escape: true,
    },
    DOB: {
        optional: {},
        isString: { errorMessage: "DOB should be string" },
        trim: true,
        escape: true,
    },
    bloodGroup: {
        optional: {},
        isString: { errorMessage: "blood group should be string" },
        trim: true,
        escape: true,
    },
    height: {
        optional: {},
        isString: { errorMessage: "height should be string" },
        trim: true,
        escape: true,
    },
    weight: {
        optional: {},
        isString: { errorMessage: "weight should be string" },
        trim: true,
        escape: true,
    },
    aadharNo: {
        optional: {},
        isNumeric: { errorMessage: "aadharNo should be in numeric" },
        isInt:{ errorMessage: "aadharNo should be integer" },
        isLength: {
            options: { min: 12, max: 12 },
            errorMessage: "aadharNo should be 10 Digits",
        },
        trim: true,
        escape: true,
    },
    transport: {
        optional: {},
        isNumeric: { errorMessage: "transport should be in numeric" },
        isInt:{ errorMessage: "transport should be integer" },
        trim: true,
        escape: true,
    },
    religion: {
        optional: {},
        isString: { errorMessage: "religion should be string" },
        trim: true,
        escape: true,
    },
    studentType: {
        optional: {},
        isNumeric: { errorMessage: "studentType should be in numeric" },
        isInt:{ errorMessage: "studentType should be integer" },
        trim: true,
        escape: true,
    },
    caste: {
        optional: {},
        isString: { errorMessage: "caste should be string" },
        trim: true,
        escape: true,
    },
    nationality: {
        optional: {},
        isString: { errorMessage: "nationality should be string" },
        trim: true,
        escape: true,
    },
    registrationNo: {
        optional: {},
        isString: { errorMessage: "registration No should be string" },
        trim: true,
        escape: true,
    },
    crnNo: {
        optional: {},
        isString: { errorMessage: "crnNo should be string" },
        trim: true,
        escape: true,
    },
    rte: {
        optional: {},
        isString: {
            options: [['Yes', 'No']], 
            errorMessage: "rte should be string" 
        },
        trim: true,
        escape: true,
    },
    rteApplicationNo: {
        optional: {},
        isString: { errorMessage: "rteApplicationNo should be string" },
        trim: true,
        escape: true,
    },
    udiseNo: {
        optional: {},
        isString: { errorMessage: "udiseNo should be string" },
        trim: true,
        escape: true,
    },
    previousClass: {
        optional: {},
        isString: { errorMessage: "previous class should be string" },
        trim: true,
        escape: true,
    },
    passYear: {
        optional: {},
        isNumeric: { errorMessage: "pass year should be in numeric" },
        isInt:{ errorMessage: "pass year should be integer" },
        trim: true,
        escape: true,
    },
    obtMarks: {
        optional: {},
        isNumeric: { errorMessage: "marks should be in numeric" },
        isInt:{ errorMessage: "marks should be integer" },
        trim: true,
        escape: true,
    },
    age: {
        optional: {},
        isNumeric: { errorMessage: "age should be in numeric" },
        isInt:{ errorMessage: "age should be integer" },
        trim: true,
        escape: true,
    },
    schoolName: {
        optional: {},
        isString: { errorMessage: "school name should be string" },
        trim: true,
        escape: true,
    },
    studentId: {
        optional: {},
        isNumeric: { errorMessage: "student id should be in numeric" },
        isInt:{ errorMessage: "student id should be integer" },
        trim: true,
        escape: true,
    },
    familyId: {
        optional: {},
        isNumeric: { errorMessage: "family id should be in numeric" },
        isInt:{ errorMessage: "family id should be integer" },
        trim: true,
        escape: true,
    },
    bankName: {
        optional: {},
        isString: { errorMessage: "bank name should be string" },
        trim: true,
        escape: true,
    },
    bankBranch: {
        optional: {},
        isString: { errorMessage: "bank branch should be string" },
        trim: true,
        escape: true,
    },
    IFSCCode: {
        optional: {},
        isString: { errorMessage: "IFSC code should be string" },
        trim: true,
        escape: true,
    },
    accountNo: {
        optional: {},
        isNumeric: { errorMessage: "account no should be in numeric" },
        isInt:{ errorMessage: "account no should be integer" },
        trim: true,
        escape: true,
    },
    panNo: {
        optional: {},
        isString: { errorMessage: "pan no should be string" },
        trim: true,
        escape: true,
    },
    fatherName: {
        optional: {},
        isString: { errorMessage: "father name should be string" },
        trim: true,
        escape: true,
    },
    fatherQualification: {
        optional: {},
        isString: { errorMessage: "father qualification should be string" },
        trim: true,
        escape: true,
    },
    fatherOccupation: {
        optional: {},
        isString: { errorMessage: "father occupation should be string" },
        trim: true,
        escape: true,
    },
    fatherIncome: {
        optional: {},
        isNumeric: { errorMessage: "father income should be in numeric" },
        isInt:{ errorMessage: "father income should be integer" },
        trim: true,
        escape: true,
    },
    Address: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    fatherMobileNo: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    fatherEmail: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    motherName: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    motherQualification: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    motherOccupation: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    motherIncome: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    motherMobileNo: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    motherEmail: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
}

module.exports = {
    studentCreateValidation
}