const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, Class, } = require('../../models')


classCreateService = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            let results = await Class.create({
                schoolId: req.user.schoolId,
                class: data.class,
                status: data.status,
            });
            console.log(results)
            if (results) {
                return res.status(200).json({
                    "code": 200,
                    "message": "class created successfully",
                    "data": []
                });
            }
            else {
                return res.status(400).json({
                    "code": 400,
                    "message": "class cannot be created",
                    "data": []
                });
            }
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "class create cannot be processed",
                "data": result.array()
            });
        }
    }
    catch (err) {
        //console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

classGetService = async (req, res, next) => {
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
                sequelize.where(sequelize.col('class'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: whereCondition,
            // include: includeConditions,
            order: [[column || 'id', sort || 'DESC']],
            limit: limit ? parseInt(limit) : undefined,
            offset: pno && limit ? parseInt(pno) * parseInt(limit) - parseInt(limit) : undefined,
        };

        const results = await Class.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "classes exist" : "No classes found",
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

classUpdateService = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            let results = await Class.update(
                {
                    class: data.class,
                    status: data.status,
                },
                {
                    where: {
                        id: data.id,
                        schoolId: req.user.schoolId
                    }
                }
            );
            if (results > 0) {
                return res.status(200).json({
                    "code": 200,
                    "message": "enquiry updated successfully",
                    "data": []
                });
            }
            else {
                return res.status(400).json({
                    "code": 400,
                    "message": "enquiry cannot be updated",
                    "data": []
                });
            }
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "invalid details",
                "data": result.array()
            });
        }
    }
    catch (err) {
        //console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

classDeleteService = async (req, res, next) => {
    try {
        const results = await Class.destroy({
            where: {
                id: data.id
            }
        }) 
        return res.status(200).json({
            "code": 200,
            "message": "deleted Enquiry",
            "data": []
        });
    }
    catch (err) {
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

module.exports = {
    classCreateService,
    classGetService,
    classUpdateService,
    classDeleteService
}