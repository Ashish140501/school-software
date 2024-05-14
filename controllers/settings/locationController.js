const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, Village, District } = require('../../models')


villageCreateService = async (req, res, next) => {
    try {
        let { name } = req.body
        let results = await Village.create({
            name: name,
        });
        if (results) {
            return res.status(200).json({
                "code": 200,
                "message": "village created successfully",
                "data": []
            });
        }
        else {
            return res.status(400).json({
                "code": 400,
                "message": "village cannot be created",
                "data": []
            });
        }

    }
    catch (err) {
        //console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

villageGetService = async (req, res, next) => {
    try {
        let { id, searchString } = req.query

        const whereCondition = { };

        if (id !== undefined) {
            whereCondition.id = id;
        }

        if (searchString !== undefined && searchString !== null) {

            whereCondition[Op.or] = [
                sequelize.where(sequelize.col('name'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: whereCondition,
        };

        const results = await Village.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "Village exist" : "No classes found",
            data: results.rows
        });
    } 
    catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
};

districtCreateService = async (req, res, next) => {
    try {
        let { name } = req.body
        let results = await District.create({
            name: name,
        });
        if (results) {
            return res.status(200).json({
                "code": 200,
                "message": "district created successfully",
                "data": []
            });
        }
        else {
            return res.status(400).json({
                "code": 400,
                "message": "district cannot be created",
                "data": []
            });
        }

    }
    catch (err) {
        //console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

districtGetService = async (req, res, next) => {
    try {
        let { id, searchString } = req.query

        const whereCondition = { };

        if (id !== undefined) {
            whereCondition.id = id;
        }

        if (searchString !== undefined && searchString !== null) {

            whereCondition[Op.or] = [
                sequelize.where(sequelize.col('name'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: whereCondition,
        };

        const results = await District.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "district exist" : "No district found",
            data: results.rows
        });
    } 
    catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
};

module.exports = {
    villageCreateService,
    villageGetService,
    districtCreateService,
    districtGetService
}