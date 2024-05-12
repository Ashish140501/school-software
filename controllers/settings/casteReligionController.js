const createError = require('http-errors');
const path = require('path');
const { sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { Caste, Religion } = require('../../models')


casteCreate = async (req, res, next) => {
    try {

            let results = await Caste.create({
                caste: req.body.caste,
            })
            return res.status(200).json({
                "code": 200,
                "message": "caste created",
                "data": []
            });
        
    } 
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

casteGet = async (req, res, next) => {
    try {
        let { searchString } = req.query

        const whereCondition = {};

        if (searchString !== undefined && searchString !== null) {
            whereCondition[Op.or] = [
                sequelize.where(sequelize.col('caste'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: whereCondition,
        };

        const results = await Caste.findAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results > 0 ? "caste exist" : "caste List found",
            data: results
        });
    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
};

religionCreate = async (req, res, next) => {
    try {

            let results = await Religion.create({
                religion: req.body.religion,
            })
            return res.status(200).json({
                "code": 200,
                "message": "caste created",
                "data": []
            });
        
    } 
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

religionGet = async (req, res, next) => {
    try {
        let { searchString } = req.query

        const whereCondition = {};

        if (searchString !== undefined && searchString !== null) {
            whereCondition[Op.or] = [
                sequelize.where(sequelize.col('religion'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: whereCondition,
        };

        const results = await Religion.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results > 0 ? "religion exist" : "religion List found",
            data: results
        });
    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
};

module.exports = {
    casteCreate,
    casteGet,
    religionCreate,
    religionGet
}