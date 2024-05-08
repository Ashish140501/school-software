const Sequelize = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const { User, School } = require('../models')

const studentCreateValidation = {
    session: {
        type: DataTypes.STRING
    },
    admissionDate: {
        type: DataTypes.DATEONLY
    },
    admissionNo: {
        type: DataTypes.STRING
    },
    rollNo: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    classId: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    sectionId: {
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    fatherName: {
        type: DataTypes.STRING
    },
    contactNo: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    DOB: {
        type: DataTypes.STRING
    },
    bloodGroup: {
        type: DataTypes.STRING
    },
    height: {
        type: DataTypes.STRING
    },
    weight: {
        type: DataTypes.STRING
    },
    aadharNo: {
        type: DataTypes.STRING
    },
    transport: {
        type: DataTypes.STRING
    },
    religion: {
        type: DataTypes.STRING
    },
    studentType: {
        type: DataTypes.STRING
    },
    caste: {
        type: DataTypes.STRING
    },
    nationality: {
        type: DataTypes.STRING
    },
    registrationNo: {
        type: DataTypes.STRING
    },
    crnNo: {
        type: DataTypes.STRING
    },
    rte: {
        type: DataTypes.STRING
    },
    rteApplicationNo: {
        type: DataTypes.STRING
    },
    udiseNo: {
        type: DataTypes.STRING
    },
    studentPhoto: {
        type: DataTypes.STRING
    },
    casteCertificate: {
        type: DataTypes.STRING
    },
    aadharCard: {
        type: DataTypes.STRING
    },
    birthCertificate: {
        type: DataTypes.STRING
    },
    transferCertificate: {
        type: DataTypes.STRING
    },
    previousClass: {
        type: DataTypes.STRING
    },
    passYear: {
        type: DataTypes.STRING
    },
    obtMarks: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.STRING
    },
    schoolName: {
        type: DataTypes.STRING
    },
    studentId: {
        type: DataTypes.STRING
    },
    familyId: {
        type: DataTypes.STRING
    },
    bankName: {
        type: DataTypes.STRING
    },
    bankBranch: {
        type: DataTypes.STRING
    },
    IFSCCode: {
        type: DataTypes.STRING
    },
    accountNo: {
        type: DataTypes.STRING
    },
    panNo: {
        type: DataTypes.STRING
    },
    fatherName: {
        type: DataTypes.STRING
    },
    fatherQualification: {
        type: DataTypes.STRING
    },
    fatherOccupation: {
        type: DataTypes.STRING
    },
    fatherIncome: {
        type: DataTypes.STRING
    },
    fatherAadharCard: {
        type: DataTypes.STRING
    },
    fatherPhoto: {
        type: DataTypes.STRING
    },
    Address: {
        type: DataTypes.TEXT
    },
    fatherMobileNo: {
        type: DataTypes.STRING
    },
    fatherEmail: {
        type: DataTypes.STRING
    },
    motherName: {
        type: DataTypes.STRING
    },
    motherQualification: {
        type: DataTypes.STRING
    },
    motherOccupation: {
        type: DataTypes.STRING
    },
    motherIncome: {
        type: DataTypes.STRING
    },
    MotherAadhardCard: {
        type: DataTypes.STRING
    },
    motherPhoto: {
        type: DataTypes.STRING
    },
    motherMobileNo: {
        type: DataTypes.STRING
    },
    motherEmail: {
        type: DataTypes.STRING
    },
}