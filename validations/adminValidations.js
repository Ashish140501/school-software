const Sequelize = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');

const{ User, School } = require('../models')

const schoolLoginValidation = [
    check("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .trim()
        .escape()
        .isString()
        .withMessage("Email in string format")
        .isEmail()
        .withMessage("invalid email format")
        .custom(async value => {
            if(value){
            console.log(value)
            const user = await User.findOne({ where: { email: value } });
            if (!user) {
                throw new Error('email does not exist');
            }
        }
        else{
            throw new Error('email cannot be empty');
        }
        }),

    check("pwd")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .trim()
        .isString()
        .withMessage("Password should be string")
        .custom(async (value, { req }) => {
            if (value) {
                const user = await User.findOne({ where: { email: req.body.email } });
                if (user) {
                    const isPasswordValid = await bcrypt.compare(value, user.pwd);
                    if (!isPasswordValid) {
                        throw new Error('Wrong password');
                    }
                }
            }
            else {
                throw new Error('password cannot be empty');
            }
        })
]

const schoolOnBoardValidation = {
    name: {
        exists: {
            errorMessage: "User name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "user name cannot be empty" },
        isString: { errorMessage: "User name should be string" },
        trim: true,
        escape: true,
    },
    contactNo:{
        exists:{
            errorMessage: "contact number is required",
            options:{checkFalsy: true},
        },
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    alternateContactNo:{
        optional: {},
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },     
    address:{
        exists:{
            errorMessage: "school address is required",
            options:{checkFalsy:true},
        },
        notEmpty: { errorMessage: "school address cannot be empty"},
        isString: { errorMessage: "school address should be string"},
        trim: true,
        escape: true,
        errorMessage: "school address should be 10 digits",
    },
    city: {
        exists: {
            errorMessage: "city name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "city name cannot be empty" },
        isString: { errorMessage: "city name should be string" },
        trim: true,
        escape: true,
    },
    state: {
        exists: {
            errorMessage: "state name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "state name cannot be empty" },
        isString: { errorMessage: "state name should be string" },
        trim: true,
        escape: true,
    },
    website: {
        optional: {},
        isString: { errorMessage: "website url should be string" },
        trim: true,
        escape: true,
    },
    adminName: {
        exists: {
            errorMessage: "admin name is required",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "admin name cannot be empty" },
        isString: { errorMessage: "admin name should be string" },
        trim: true,
        escape: true,
    },
    adminContactNo:{
        exists:{
            errorMessage: "admin contact no is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "admin contact no cannot be empty" },
        isNumeric: { errorMessage: "contact no should be in numeric" },
        isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    adminEmail: {
        exists: {
            errorMessage: "Email is mandatory",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "Email cannot be empty"},
        isString: { errorMessage: "User name should be string" },
        trim: true,
        escape: true,
        isEmail: { errorMessage: "Please provide valid email"},
        custom: {
            options: async (value, { req }) => {
                if (value) {
                    console.log(value)
                    const user = await User.findOne({ where: { email: value } });
                    if (user) {
                        throw new Error('email already exist');
                    }
                }
            },
        }
    },
    adminPwd:{
        exists:{
            errorMessage: "Password is required",
            options:{checkFalsy:true},
        },
        notEmpty:{errorMessage:"Password cannot be empty"},
        isString:{errorMessage: "Password should be string" },
        trim:true,
        escape:true,
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            errorMessage: "Password must be atleast 8 and contain at least one uppercase letter, one lowercase letter, and one number",
        },
        matches: {
        options: [/^[A-Za-z0-9 .,'@#%$^&*()!-+*?,~`'";:|/]+$/],
            errorMessage: "Password must be atleast 8 and contain at least one uppercase letter, one lowercase letter, and one number",
          }
    },
};


const schoolEditValidation = [
    // Validation rules for name
    check('name').optional().isString().withMessage("Name should be string").trim().escape(),

    // Validation rules for contactNo
    check('contactNo').optional().isNumeric().withMessage("Contact no should be numeric").isInt().withMessage("Contact no should be integer").trim().escape(),

    // Validation rules for alternateContactNo
    check('alternateContactNo').optional().isNumeric().withMessage("Contact no should be numeric").isInt().withMessage("Contact no should be integer").trim().escape(),

    // Validation rules for address
    check('address').optional().notEmpty().withMessage("School address cannot be empty").isString().withMessage("School address should be string").trim().escape(),

    // Validation rules for city
    check('city').optional().notEmpty().withMessage("City name cannot be empty").isString().withMessage("City name should be string").trim().escape(),

    // Validation rules for state
    check('state').optional().notEmpty().withMessage("State name cannot be empty").isString().withMessage("State name should be string").trim().escape(),

    // Validation rules for website
    check('website').optional().isString().withMessage("Website URL should be string").trim().escape(),
];

module.exports = {
    schoolOnBoardValidation,
    schoolLoginValidation,
    schoolEditValidation
}