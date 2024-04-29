const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, TableList, Class, Section } = require('../models')


admissionListSeed = async (schoolId) => {
    try {

        admissionList = [
            {
                "schoolId": schoolId,
                "tableName": "Admission Details",
                "list": [
                    {
                        "field": "Session",
                        "status": "1",
                        "default": "true"
                    },
                    {
                        "field": "Admission Date",
                        "status": "1",
                        "default": "true"
                    },
                    {
                        "field": "Admission No.",
                        "status": "1",
                        "default": "true"
                    },
                    {
                        "field": "Roll No.",
                        "status": "1",
                        "default": "true"
                    },
                    {
                        "field": "First Name",
                        "status": "1",
                        "default": "true"
                    },
                    {
                        "field": "Last Name",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Class",
                        "status": "1",
                        "default": "true"
                    },
                    {
                        "field": "Section",
                        "status": "1",
                        "default": "true"
                    },
                    {
                        "field": "Father Name",
                        "status": "1",
                        "default": "true"
                    },
                    {
                        "field": "Contact no.",
                        "status": "1",
                        "default": "true"
                    }
                ]
            },
            {
                "schoolId": schoolId,
                "tableName": "Student Details",
                "list": [
                    {
                        "field": "Gender",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "D.O.B.",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Blood group",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Height",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "weight",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Adhar no.",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Transport",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Religion",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Student Type",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Caste",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Nationality",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Registration No.",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "CRN No.",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "RTE",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "RTE application no.",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "UDISE No.",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Faimly ID",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Student Photo",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Caste certificate",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Adhar card",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "birth certificate",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "transfer certificate",
                        "status": "1",
                        "default": "false"
                    }
                ]
            },
            {
                "schoolId": schoolId,
                "tableName": "Previous Qualifications Details",
                "list": [
                    {
                        "field": "Previous class",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Pass year",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Obt. Marks",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "% age",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Obt. Marks",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "School name",
                        "status": "1",
                        "default": "false"
                    }
                ]
            },
            {
                "schoolId": schoolId,
                "tableName": "Govt Portal ID",
                "list": [
                    {
                        "field": "Student ID",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Family ID",
                        "status": "1",
                        "default": "false"
                    }
                ]
            },
            {
                "schoolId": schoolId,
                "tableName": "Bank Account Details",
                "list": [
                    {
                        "field": "Bank Name",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Bank Branch",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "IFSC Code",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Account No.",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "PAN No.",
                        "status": "1",
                        "default": "false"
                    }
                ]
            },
            {
                "schoolId": schoolId,
                "tableName": "Family Details",
                "list": [
                    {
                        "field": "Father name",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "father Qualification",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "father Occupation",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "father Income",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "Father adhar card",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "father Photo",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "Address",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "father Mobile no",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "father Email",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "Mother's name",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "mother Qualification",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "mother Occupation",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "mother Income",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "Mother adhard",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "mother Photo",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "mother Mobile no",
                        "default":"false",
                        "status": 1
                    },
                    {
                        "field": "mother Email",
                        "default":"false",
                        "status": 1
                    }
                ]
            },
        ]

        let results = await TableList.bulkCreate(admissionList)

        console.log("admission list created")

    }
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

module.exports = {
    admissionListSeed
}