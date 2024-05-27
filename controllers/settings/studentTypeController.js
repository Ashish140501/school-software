const createError = require('http-errors');
const path = require('path');
const { sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { StudentType } = require('../../models')


studentTypeCreate = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {

            let data = matchedData(req);

            let results = await StudentType.create({
                schoolId: req.user.schoolId,
                studentType: data.studentType,
                status: 1,
            })
            return res.status(200).json({
                "code": 200,
                "message": "student type created",
                "data": []
            });
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "student type is not added",
                "data": result.array()
            });
        }
    } 
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

studentTypeUpdate = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            console.log(req.body)

            let data = matchedData(req);

            let results = await StudentType.update(
                {
                    studentType: data.studentType,
                },
                {
                    where: {
                        id: data.id,
                        schoolId: req.user.schoolId
                    },
                }
            )

            return res.status(200).json({
                "code": 200,
                "message": "student type updated",
                "data": []
            });
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "studentType create cannot be processed",
                "data": result.array()
            });
        }
    } 
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

studentTypeGet = async (req, res, next) => {
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

        const results = await StudentType.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "student type exist" : "student type List found",
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

studentTypeDelete = async (req, res, next) => {
    try {
        let data = req.body
        const results = await StudentType.destroy({
            where: {
                id: data.id
            }
        }) 
        if(results){
            return res.status(200).json({
                "code": 200,
                "message": "deleted student type",
                "data": []
            });
        }
        else{
            return res.status(400).json({
                "code": 400,
                "message": "failed",
                "data": []
            });
        } 
    }
    catch (err) {
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

module.exports = {
    studentTypeCreate,
    studentTypeUpdate,
    studentTypeGet,
    studentTypeDelete
}