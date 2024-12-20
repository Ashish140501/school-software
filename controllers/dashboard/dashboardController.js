const createError = require('http-errors');
const path = require('path');
const moment = require('moment')
const { Sequelize, Op } = require('sequelize');

const { validationResult, matchedData } = require('express-validator');

const { sequelize, Enquiry, Student, Village, District} = require('../../models')

enquiryCount = async (req, res, next) => {
    try {

        const todayCount = await Enquiry.count({
            where: {
                schoolId: req.user.schoolId,
                followUpDate: {
                    [Op.lte]: moment().format('YYYY-MM-DD')
                }
            }
        });

        const studentCount = await Student.count({
            where: {
                schoolId: req.user.schoolId,
            }
        });

        return res.status(200).json({
            code: 200,
            message: "dashboard data",
            data: { 
                followUps : {
                    date: moment().format('DD-MM-YYYY'),
                    count: todayCount
                },
                students : {
                    count: studentCount
                }
            }
        });
        

    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
}

module.exports = {
    enquiryCount
}