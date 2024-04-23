const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, TableList, Class, Section } = require('../../models')


tableListCreate = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {

            let data = matchedData(req);

            let results = await TableList.create({
                schoolId: req.user.schoolId,
                tableName: data.tableName,
                list: data.list
            })
            return res.status(200).json({
                "code": 200,
                "message": "table list created",
                "data": []
            });
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
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

tableListUpdate = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            console.log(req.body)

            let data = matchedData(req);
            console.log(data.list)

            for( i = 0; i < data.list.length; i++){
                let results = await TableList.update(
                    {
                        list: data.list[i].list
                    },
                    {
                        where: {
                            id: data.list[i].id,
                            schoolId: req.user.schoolId,
                        },
                    }
                )
            }
            return res.status(200).json({
                "code": 200,
                "message": "table list updated",
                "data": []
            });
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
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

tableListGet = async (req, res, next) => {
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
            order: [[column || 'id', sort || 'ASC']],
            limit: limit ? parseInt(limit) : undefined,
            offset: pno && limit ? parseInt(pno) * parseInt(limit) - parseInt(limit) : undefined,
        };

        const results = await TableList.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "Table List exist" : "No Table List found",
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
    tableListCreate,
    tableListUpdate,
    tableListGet
}