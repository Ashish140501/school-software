const{ SuperUser, User } = require('../models')

// register for new super user
const superUserRegisterValidation = {
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
    email: {
        exists: {
            errorMessage: "Email is mandatory",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "Email cannot be empty"},
        isString: { errorMessage: "Email name should be string" },
        trim: true,
        escape: true,
        isEmail: { errorMessage: "Please provide valid email"},
        custom: {
            options: async (value, { req }) => {
                if (value) {
                    console.log(value)
                    const user = await SuperUser.findOne({ where: { email: value } });
                    if (user) {
                        throw new Error('email already exist');
                    }
                }
            },
        }
    },
    pwd:{
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


// login for super user
const superUserLoginValidation = {
    email: {
        exists: {
            errorMessage: "Email is mandatory",
            options: { checkFalsy: true },
        },
        notEmpty: { errorMessage: "Email cannot be empty"},
        isString: { errorMessage: "Email name should be string" },
        trim: true,
        escape: true,
        isEmail: { errorMessage: "Please provide valid email"},
    },
    pwd:{
        exists:{
            errorMessage: "Password is required",
            options:{checkFalsy:true},
        },
        notEmpty:{errorMessage:"Password cannot be empty"},
        isString:{errorMessage: "Password should be string" },
    },
};


// add new school by super user
const schoolAddNewValidation = {
    name: {
        exists: {
            errorMessage: "School name is required",
            options: { checkFalsy: true },
        },
        //notEmpty: { errorMessage: "School name cannot be empty" },
        isString: { errorMessage: "School name should be string" },
        trim: true,
        escape: true,
    },
    contactPerson:{
        exists:{
            errorMessage: "contact person name is required",
            options:{checkFalsy: true},
        },
        //notEmpty: { errorMessage: "user name cannot be empty" },
        isString: { errorMessage: "User name should be string" },
        trim: true,
        escape: true,
    },
    contactNo:{
        exists:{
            errorMessage: "Contact number is required",
            options:{checkFalsy: true},
        },
        //isNumeric: { errorMessage: "contact no should be in numeric" },
        //isInt:{ errorMessage: "contact no should be integer" },
        trim: true,
        escape: true,
    },
    alternateContactNo:{
        optional: {},
        //isNumeric: { errorMessage: "Contact no should be in numeric" },
        //isInt:{ errorMessage: "Contact No should be integer" },
        trim: true,
        escape: true,
    },     
    address:{
        exists:{
            errorMessage: "School address is required",
            options:{checkFalsy:true},
        },
        //notEmpty: { errorMessage: "school address cannot be empty"},
        isString: { errorMessage: "school address should be string"},
        trim: true,
        escape: true,
        errorMessage: "school address should be 10 digits",
    },
    city: {
        exists: {
            errorMessage: "City name is required",
            options: { checkFalsy: true },
        },
        //notEmpty: { errorMessage: "city name cannot be empty" },
        isString: { errorMessage: "city name should be string" },
        trim: true,
        escape: true,
    },
    state: {
        exists: {
            errorMessage: "State name is required",
            options: { checkFalsy: true },
        },
        //notEmpty: { errorMessage: "state name cannot be empty" },
        isString: { errorMessage: "state name should be string" },
        trim: true,
        escape: true,
    },
    website: {
        optional: {},
        isString: { errorMessage: "Website url should be string" },
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
    admissionNoSeq: {
        exists:{
            errorMessage: "admission no.seq is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "admission no.seq cannot be empty" },
        isNumeric: { errorMessage: "admission no.seq should be in numeric" },
        isInt:{ errorMessage: "admission no.seq should be integer" },
        trim: true,
        escape: true,
    },
    rollNoSeq: {
        exists:{
            errorMessage: "roll no.seq is required",
            options:{checkFalsy: true},
        },
        notEmpty: { errorMessage: "roll no.seq cannot be empty" },
        isNumeric: { errorMessage: "roll no.seq be in numeric" },
        isInt:{ errorMessage: "roll no.seq should be integer" },
        trim: true,
        escape: true,
    },
    // adminPwd:{
    //     exists:{
    //         errorMessage: "Password is required",
    //         options:{checkFalsy:true},
    //     },
    //     notEmpty:{errorMessage:"Password cannot be empty"},
    //     isString:{errorMessage: "Password should be string" },
    //     trim:true,
    //     escape:true,
    //     isStrongPassword: {
    //         minLength: 8,
    //         minLowercase: 1,
    //         minUppercase: 1,
    //         minNumbers: 1,
    //         errorMessage: "Password must be atleast 8 and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
    //     },
    //     matches: {
    //     options: [/^[A-Za-z0-9 .,'@#%$^&*()!-+*?,~`'";:|/]+$/],
    //         errorMessage: "Password must be atleast 8 and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
    //       }
    // },
};


module.exports = {
    superUserRegisterValidation,
    superUserLoginValidation,
    schoolAddNewValidation
}