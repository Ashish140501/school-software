const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, Class, Section, School } = require('../../models')

adminSettingsCreate = async (req, res, next) => {

    try {
        let result = validationResult(req);
        if (result.isEmpty()) {

            let data = matchedData(req);
            let results = await School.update(
                {
                    admissionNoSeq: data.admissionNoSeq,
                    rollNoSeq: data.rollNoSeq
                },
                {
                    where: {
                        id: req.user.schoolId,
                    }
                }
            );
            if(results){
                return res.status(200).json({
                    "code": 200,
                    "message": "admissionSeq and rollNoSeq created",
                    "data": []
                });
            }
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "admissionSeq and rollNoSeq create cannot be processed",
                "data": result.array()
            });
        }
    }
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

adminSettings = async (req, res, next) => {

    try {
        let results = await School.findOne({
            where: {
                id: req.user.schoolId,
            }
        });

        let settings = []
        if (!results.admissionNoSeq) {
            let admission = {
                "admissionNoSeq": results.admissionNoSeq,
                "exist": 0
            }
            settings.push(admission)
        }
        else {
            let admission = {
                "admissionNoSeq": results.admissionNoSeq,
                "exist": 1
            }
            settings.push(admission)
        }

        if (!results.rollNoSeq) {
            let rollNo = {
                "rollNoSeq": results.rollNoSeq,
                "exist": 0
            }
            settings.push(rollNo)
        }
        else {
            let rollNo = {
                "rollNoSeq": results.rollNoSeq,
                "exist": 1
            }
            settings.push(rollNo)
        }

        return res.status(200).json({
            "code": 200,
            "message": "admissionSeq and rollNoSeq",
            "data": settings
        });

    }
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

module.exports = {
    adminSettingsCreate,
    adminSettings
}