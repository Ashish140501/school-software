const createError = require('http-errors');
const path = require('path');
const { sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { Transport } = require('../../models')


transportCreate = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {

            let data = matchedData(req);

            let results = await Transport.create({
                schoolId: req.user.schoolId,
                pickUp: data.pickUp,
                distance: data.distance,
                amount: data.amount,
            })
            return res.status(200).json({
                "code": 200,
                "message": "route created",
                "data": []
            });
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "route cannot be processed",
                "data": result.array()
            });
        }
    } 
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

transportUpdate = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            console.log(req.body)

            let data = matchedData(req);

            let results = await Transport.update(
                {
                    pickUp: data.pickUp,
                    distance: data.distance,
                    amount: data.amount,
                },
                {
                    where: {
                        id: data.id,
                        schoolId: req.user.schoolId,
                    },
                }
            )

            return res.status(200).json({
                "code": 200,
                "message": "route updated",
                "data": []
            });
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "route cannot be processed",
                "data": result.array()
            });
        }
    } 
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

transportGet = async (req, res, next) => {
    try {
        let { id, column, pno, limit, sort, searchString } = req.query

        const whereCondition = {
            schoolId: req.user.schoolId,
        };

        if (id !== undefined) {
            whereCondition.id = id;
        }

        if (searchString !== undefined && searchString !== null) {
            whereCondition[Op.or] = [
                sequelize.where(sequelize.col('pickUp'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: whereCondition,
            distinct: true,
            order: [[column || 'id', sort || 'ASC']],
            limit: limit ? parseInt(limit) : undefined,
            offset: pno && limit ? parseInt(pno) * parseInt(limit) - parseInt(limit) : undefined,
        };

        const results = await Transport.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "route exist" : "route List found",
            data: {
                currentPno: pno ? parseInt(pno) : 1,
                totalPages: limit ? Math.ceil(results.count / parseInt(limit)) : 1,
                totalRecords: results.count,
                totalPageCount: results.rows.length,
                rows: results.rows
            }
        });
    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
};

module.exports = {
    transportCreate,
    transportUpdate,
    transportGet
}