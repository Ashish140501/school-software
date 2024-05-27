const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, Village, Session } = require('../../models')


sessionCreateService = async (req, res, next) => {
    try {
        let { session } = req.body
        let results = await Session.create({
            schoolId: req.user.schoolId,
            session: session
        });
        if (results) {
            return res.status(200).json({
                "code": 200,
                "message": "session created successfully",
                "data": []
            });
        }
        else {
            return res.status(400).json({
                "code": 400,
                "message": "session cannot be created",
                "data": []
            });
        }

    }
    catch (err) {
        //console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

sessionGetService = async (req, res, next) => {
    try {
        let { id, searchString, admission } = req.query

        const queryOptions = {};

        const whereCondition = {
            schoolId: req.user.schoolId,
        };

        if (admission) {
            queryOptions.order = [['createdAt', 'DESC']],
                queryOptions.limit = 1
        };

        if (id !== undefined) {
            whereCondition.id = id;
        };

        if (searchString !== undefined && searchString !== null) {

            whereCondition[Op.or] = [
                sequelize.where(sequelize.col('session'), { [Op.iLike]: `%${searchString}%` }),
            ];
        };

        queryOptions.attributes = { exclude: ['createdAt', 'updatedAt'] };
        queryOptions.where = whereCondition;


        const results = await Session.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "session exist" : "No session found",
            data: results.rows
        });
    }
    catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
};

sessionUpdateService = async (req, res, next) => {
    try {
        let { id, session } = req.body
        let results = await Session.update(
            {
                session: session,
            },
            {
                where: {
                    id: id,
                    schoolId: req.user.schoolId
                }
            }
        );
        if (results)
            return res.status(200).json({
                "code": 200,
                "message": "updated Session",
                "data": []
            });
        else
            return res.status(200).json({
                "code": 200,
                "message": "Session update failed",
                "data": []
            });

    }
    catch (err) {
        //console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

sessionDeleteService = async (req, res, next) => {
    try {
        let { id } = req.body
        const results = await Session.destroy({
            where: {
                id: id
            }
        })
        if (results)
            return res.status(200).json({
                "code": 200,
                "message": "deleted Session",
                "data": []
            });
        else
            return res.status(200).json({
                "code": 200,
                "message": "Session deletion failed",
                "data": []
            });
    }
    catch (err) {
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

module.exports = {
    sessionCreateService,
    sessionGetService,
    sessionUpdateService,
    sessionDeleteService
}