const Sequelize = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const { School } = require('../models');

const validateBulkStudents = (req, res, next) => {
    next()
};

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
        trim: true,
        escape: true,
        custom: {
            options: async (value, { req }) => {
                console.log(value)
                if (value == null || value == '') {
                    return true
                }
                else{
                    if(value.length !== 12){
                        throw new Error('aadharNo should have 12 digits')
                    }
                }
            },
        }
    },
    transportId: {
        optional: {},
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
        isString: { errorMessage: "pass year should be string" },
        trim: true,
        escape: true,
    },
    obtMarks: {
        optional: {},
        isString: { errorMessage: "obtMarks should be string" },
        trim: true,
        escape: true,
    },
    age: {
        optional: {},
        isString: { errorMessage: "age should be string" },
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
        isString: { errorMessage: "student id should be string" },
        trim: true,
        escape: true,
    },
    familyId: {
        optional: {},
        isString: { errorMessage: "family id should be string" },
        trim: true,
        escape: true,
    },
    staffNo: {
        optional: {},
        isString: { errorMessage: "staff no should be string" },
        trim: true,
        escape: true,
    },
    availingTransport: {
        optional: {},
        isString: {
            options: [['Yes', 'No']], 
            errorMessage: "availingTransport should be string" 
        },
        trim: true,
        escape: true,
    },
    percentage: {
        optional: {},
        isString: { errorMessage: "percentage should be string" },
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
        isString: { errorMessage: "accountNo should be string" },
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
    fatherAadharNo: {
        optional: {},
        isString: { errorMessage: "fatherAadharNo should be string" },
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
        isString: { errorMessage: "father income should be string" },
        trim: true,
        escape: true,
    },
    Address: {
        optional: {},
        isString: { errorMessage: "Address should be string" },
        trim: true,
        escape: true,
    },
    fatherMobileNo: {
        optional: {},
        isString: { errorMessage: "father mobile no should be string" },
        trim: true,
        escape: true,
    },
    fatherEmail: {
        optional: {},
        isString: { errorMessage: "father email should be string" },
        trim: true,
        escape: true,
    },
    motherName: {
        optional: {},
        isString: { errorMessage: "mother name should be string" },
        trim: true,
        escape: true,
    },
    motherAadharNo: {
        optional: {},
        isString: { errorMessage: "motherAadharNo should be string" },
        trim: true,
        escape: true,
    },
    motherQualification: {
        optional: {},
        isString: { errorMessage: "mother qualification should be string" },
        trim: true,
        escape: true,
    },
    motherOccupation: {
        optional: {},
        isString: { errorMessage: "mother occupation should be string" },
        trim: true,
        escape: true,
    },
    motherIncome: {
        optional: {},
        isString: { errorMessage: "mother income should be string" },
        trim: true,
        escape: true,
    },
    motherMobileNo: {
        optional: {},
        isString: { errorMessage: "mother mobile no should be string" },
        trim: true,
        escape: true,
    },
    motherEmail: {
        optional: {},
        isString: { errorMessage: "mother email should be string" },
        trim: true,
        escape: true,
    },
}

const studentUpdateValidation = {
    id: {
        exists:{
            errorMessage: "studentId is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "studentId should be in numeric" },
        isInt:{ errorMessage: "studentId should be integer" },
        trim: true,
        escape: true,
    },
    familyId: {
        exists:{
            errorMessage: "familyId is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "familyId should be in numeric" },
        isInt:{ errorMessage: "familyId should be integer" },
        trim: true,
        escape: true,
    },
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
        trim: true,
        escape: true,
        custom: {
            options: async (value, { req }) => {
                console.log(value)
                if (value == null || value == '') {
                    return true
                }
                else{
                    if(value.length !== 12){
                        throw new Error('aadharNo should have 12 digits')
                    }
                }
            },
        }
    },
    transportId: {
        optional: {},
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
        isString: { errorMessage: "pass year should be string" },
        trim: true,
        escape: true,
    },
    obtMarks: {
        optional: {},
        isString: { errorMessage: "obtMarks should be string" },
        trim: true,
        escape: true,
    },
    age: {
        optional: {},
        isString: { errorMessage: "age should be string" },
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
        isString: { errorMessage: "student id should be string" },
        trim: true,
        escape: true,
    },
    familyId: {
        optional: {},
        isString: { errorMessage: "family id should be string" },
        trim: true,
        escape: true,
    },
    staffNo: {
        optional: {},
        isString: { errorMessage: "staff no should be string" },
        trim: true,
        escape: true,
    },
    availingTransport: {
        optional: {},
        isString: {
            options: [['Yes', 'No']], 
            errorMessage: "availingTransport should be string" 
        },
        trim: true,
        escape: true,
    },
    percentage: {
        optional: {},
        isString: { errorMessage: "percentage should be string" },
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
        isString: { errorMessage: "accountNo should be string" },
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
    fatherAadharNo: {
        optional: {},
        isString: { errorMessage: "fatherAadharNo should be string" },
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
        isString: { errorMessage: "father income should be string" },
        trim: true,
        escape: true,
    },
    Address: {
        optional: {},
        isString: { errorMessage: "Address should be string" },
        trim: true,
        escape: true,
    },
    fatherMobileNo: {
        optional: {},
        isString: { errorMessage: "father mobile no should be string" },
        trim: true,
        escape: true,
    },
    fatherEmail: {
        optional: {},
        isString: { errorMessage: "father email should be string" },
        trim: true,
        escape: true,
    },
    motherName: {
        optional: {},
        isString: { errorMessage: "mother name should be string" },
        trim: true,
        escape: true,
    },
    motherAadharNo: {
        optional: {},
        isString: { errorMessage: "motherAadharNo should be string" },
        trim: true,
        escape: true,
    },
    motherQualification: {
        optional: {},
        isString: { errorMessage: "mother qualification should be string" },
        trim: true,
        escape: true,
    },
    motherOccupation: {
        optional: {},
        isString: { errorMessage: "mother occupation should be string" },
        trim: true,
        escape: true,
    },
    motherIncome: {
        optional: {},
        isString: { errorMessage: "mother income should be string" },
        trim: true,
        escape: true,
    },
    motherMobileNo: {
        optional: {},
        isString: { errorMessage: "mother mobile no should be string" },
        trim: true,
        escape: true,
    },
    motherEmail: {
        optional: {},
        isString: { errorMessage: "mother email should be string" },
        trim: true,
        escape: true,
    },
}

module.exports = {
    validateBulkStudents,
    studentCreateValidation,
    studentUpdateValidation
}