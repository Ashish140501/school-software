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
                        "field": "Contact no.",
                        "status": "1",
                        "default": "true"
                    },
                    {
                        "field": "Father Name",
                        "status": "1",
                        "default": "true"
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
                        "field": "Student Type",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Staff No",
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
                        "field": "Availing Transport",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Transport",
                        "status": "1",
                        "default": "false"
                    },
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
                        "default": "true"
                    },
                    {
                        "field": "Age",
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
                        "field": "Blood group",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Caste",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Religion",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Nationality",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Adhar no.",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Registration No.",
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
                        "field": "previous School name",
                        "status": "1",
                        "default": "false"
                    },
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
                        "field": "percentage",
                        "status": "1",
                        "default": "false"
                    },
                ]
            },
            {
                "schoolId": schoolId,
                "tableName": "Family Details",
                "list": [
                    {
                        "field": "Father name",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Father Qualification",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Father Occupation",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Address",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Father Mobile no",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Father Email",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Father Income",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Father Aadhar Card No",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Mother name",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Mother Qualification",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Mother Occupation",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Mother Mobile no",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Mother Email",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Mother Income",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Mother Aadhard Card No",
                        "default": "false",
                        "status": "1"
                    },
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
                    },
                    {
                        "field": "Upload PAN Card",
                        "status": "1",
                        "default": "false"
                    }
                ]
            },
            {
                "schoolId": schoolId,
                "tableName": "Uploads",
                "list": [
                    {
                        "field": "Student Photo",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Adhar card",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Caste Certificate",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Birth Certificate",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Transfer Certificate",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Character Certificate",
                        "status": "1",
                        "default": "false"
                    },
                    {
                        "field": "Father Photo",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Father Aadhar Card",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Mother Photo",
                        "default": "false",
                        "status": "1"
                    },
                    {
                        "field": "Mother Aadhar Card",
                        "default": "false",
                        "status": "1"
                    },
                ]
            },
        ]

        let results = await TableList.bulkCreate(admissionList)

    }
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

module.exports = {
    admissionListSeed
}