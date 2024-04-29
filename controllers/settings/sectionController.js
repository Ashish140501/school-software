const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, Class, Section } = require('../../models')


sectionGetService = async (req, res, next) => {
    try {
        let { id, classId, column, pno, limit, sort, searchString } = req.query

        const whereCondition = {
            schoolId: req.user.schoolId,
        };

        // const includeConditions = [
        //     { model: Class, required: true, attributes: ['section'] }
        // ];

        if (id !== undefined) {
            whereCondition.id = id; 
        }

        if (classId !== undefined) {
            whereCondition.classId = classId; 
        }

        if (searchString !== undefined && searchString !== null) {
            whereCondition[Op.or] = [
                sequelize.where(sequelize.col('section'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: { exclude: ['schoolId', 'status', 'createdAt', 'updatedAt'] },
            where: whereCondition,
            // include: includeConditions,
            order: [[column || 'id', sort || 'DESC']],
            limit: limit ? parseInt(limit) : undefined,
            offset: pno && limit ? parseInt(pno) * parseInt(limit) - parseInt(limit) : undefined,
        };

        const results = await Section.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "Section exist" : "No Section found",
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
    sectionGetService
}