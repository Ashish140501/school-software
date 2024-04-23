const createError = require('http-errors');
const path = require('path');
const moment = require('moment')
const { Sequelize, Op } = require('sequelize');

const { validationResult, matchedData } = require('express-validator');

const { sequelize, Enquiry, Village, District} = require('../../models')

enquiryCount = async (req, res, next) => {
    try {
        let { followUpDate } = req.query

        let todayDate = moment(followUpDate)
        let tomorrowDate = moment(followUpDate).add(1,'days')

        const todayCount = await Enquiry.count({
            where : {
                followUpDate : todayDate
            }
        });

        const tomorrowCount = await Enquiry.count({
            where : {
                followUpDate : tomorrowDate
            }
        });

        if(todayCount > 0){
            return res.status(200).json({
                code: 200,
                message: "dashboard data",
                data: { 
                    followUps : {
                        date: moment(todayDate).format('YYYY-MM-DD'),
                        count: todayCount
                    }
                }
            });
        }
        else{
            return res.status(200).json({
                code: 200,
                message: "dashboard data",
                data: { 
                    followUps : {
                        date: moment(tomorrowDate).format('YYYY-MM-DD'),
                        count: tomorrowCount
                    }
                }
            });
        }
        console.log(results)

    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
}

module.exports = {
    enquiryCount
}