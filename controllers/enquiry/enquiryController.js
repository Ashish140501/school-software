const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, Enquiry, Village, District} = require('../../models')


enquiryCreateService = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            let results = await Enquiry.create({
                schoolId: req.user.schoolId,
                enquiryDate: data.enquiryDate,
                name: data.name,
                lastName: data.lastName,
                parentName: data.parentName,
                contactNo: data.contactNo,
                class: data.class,
                previousSchool: data.previousSchool,
                villageOrCity: data.villageOrCity,
                district: data.district,
                followUpDate: data.followUpDate,
                remarks: data.remarks,
                status: 1,
            });
            
            if (results) {
                let [ village, villageCreated ] = await Village.findOrCreate({
                    where:{
                        name: data.villageOrCity
                    }
                })

                let [ district, districtCreated ] = await District.findOrCreate({
                    where:{
                        name: data.district
                    }
                })

                return res.status(200).json({
                    "code": 200,
                    "message": "enquiry created successfully",
                    "data": []
                });
            }
            else {
                return res.status(400).json({
                    "code": 400,
                    "message": "enquiry cannot be created",
                    "data": []
                });
            }
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "Enquiry create cannot be processed",
                "data": result.array()
            });
        }
    }
    catch (err) {
        //console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

enquiryGetService = async (req, res, next) => {
    try {
        let { id, column, pno, limit, sort, searchString, fromDate, toDate } = req.query

        const whereCondition = {
            schoolId: req.user.schoolId,
        };

        if (id !== undefined) {
            whereCondition.id = id;
        }

        if (fromDate !== undefined && toDate !== undefined) {
            whereCondition.enquiryDate = { [Op.between]: [new Date(fromDate), new Date(toDate)] };
        }

        if (searchString !== undefined && searchString !== null) {

            whereCondition[Op.or] = [
                sequelize.where(sequelize.col('name'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('lastName'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('parentName'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('contactNo'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('class'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('previousSchool'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('villageOrCity'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('district'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('remarks'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: whereCondition,
            // include: includeConditions,
            order: [[column || 'followUpDate', sort || 'ASC']],
            limit: limit ? parseInt(limit) : undefined,
            offset: pno && limit ? parseInt(pno) * parseInt(limit) - parseInt(limit) : undefined,
        };

        const results = await Enquiry.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "enquiries exist" : "No enquiries found",
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

enquiryUpdateService = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            let results = await Enquiry.update(
                {
                    enquiryDate: data.enquiryDate,
                    name: data.name,
                    lastName: data.lastName,
                    parentName: data.parentName,
                    contactNo: data.contactNo,
                    class: data.class,
                    previousSchool: data.previousSchool,
                    villageOrCity: data.villageOrCity,
                    district: data.district,
                    followUpDate: data.followUpDate,
                    remarks: data.remarks,
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
};

enquiryDeleteService = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            const results = await Enquiry.destroy({
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
        else {
            return res.status(422).json({
                "code": 422,
                "message": "invalid details",
                "data": result.array()
            });
        }
    }
    catch (err) {
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

module.exports = {
    enquiryCreateService,
    enquiryGetService,
    enquiryUpdateService,
    enquiryDeleteService
}