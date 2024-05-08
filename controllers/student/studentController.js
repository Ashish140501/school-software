const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, Student, Family, Class, Section } = require('../../models')


studentCreateService = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            console.log('file')
            console.log(req.file)
            console.log('files')
            console.log(req.files)
            console.log('req')
            // console.log(req)
            let results = await Student.create({
                schoolId: req.user.schoolId,
                session: data.session,
                admissionDate: data.admissionDate,
                admissionNo: data.admissionNo,
                rollNo: data.rollNo,
                firstName: data.firstName,
                lastName: data.lastName,
                contactNo: data.contactNo,
                fatherName: data.fatherName,
                classId: data.classId,
                sectionId: data.sectionId,
                studentType: data.studentType,
                staffNo: data.staffNo,
                rte: data.rte,
                rteApplicationNo: data.rteApplicationNo,
                availingTransport: data.availingTransport,
                transport: data.transport,
                gender: data.gender,
                DOB: data.DOB,
                age: data.age,
                height: data.height,
                weight: data.weight,
                bloodGroup: data.bloodGroup,
                caste: data.caste,
                religion: data.religion,
                nationality: data.nationality,
                aadharNo: data.aadharNo,
                registrationNo: data.registrationNo,
                crnNo: data.crnNo,
                udiseNo: data.udiseNo,
                familyId: data.familyId,
                schoolName: data.schoolName,
                previousClass: data.previousClass,
                passYear: data.passYear,
                obtMarks: data.obtMarks,
                percentage: data.percentage,
                studentPhoto: data.studentPhoto,
                casteCertificate: data.casteCertificate,
                aadharCard: data.aadharCard,
                birthCertificate: data.birthCertificate,
                transferCertificate: data.transferCertificate,
                studentId: data.studentId,
                status: 1,
            });

            if (results) {
                let familyCreate = await Family.create({
                    schoolId: req.user.schoolId,
                    studentId: results.id,
                    bankName: data.bankName,
                    bankBranch: data.bankBranch,
                    IFSCCode: data.IFSCCode,
                    accountNo: data.accountNo,
                    panNo: data.panNo,
                    // uploadPanCard:data.uploadPanCard,
                    fatherName: data.fatherName,
                    fatherQualification: data.fatherQualification,
                    fatherOccupation: data.fatherOccupation,
                    fatherIncome: data.fatherIncome,
                    fatherAadharCard: data.fatherAadharCard,
                    fatherPhoto: data.fatherPhoto,
                    Address: data.Address,
                    fatherMobileNo: data.fatherMobileNo,
                    fatherEmail: data.fatherEmail,
                    motherName: data.motherName,
                    motherQualification: data.motherQualification,
                    motherOccupation: data.motherOccupation,
                    motherIncome: data.motherIncome,
                    motherAadhardCard: data.motherAadhardCard,
                    motherPhoto: data.motherPhoto,
                    motherMobileNo: data.motherMobileNo,
                    motherEmail: data.motherEmail,
                    fatherAadharNo: data.fatherAadharNo,
                    motherAadharNo: data.motherAadharNo 
                });

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

studentGetService = async (req, res, next) => {
    try {
        let { id, pno, limit, column, sort, searchString, fromDate, toDate, admissionList } = req.query

        const whereCondition = {
            schoolId: req.user.schoolId,
        };

        const includeConditions = [
            { model: Section, required: true, attributes: [], where: { schoolId:req.user.schoolId } },
            { model: Class, required: true, attributes: [], where: { schoolId:req.user.schoolId } },
        ];

        if (admissionList) {
            const startOfYear = moment().startOf('year');
            const endOfYear = moment().endOf('year');

            whereCondition.admissionDate = { [Op.between]: [startOfYear, endOfYear] }
        }

        if (id !== undefined) {
            whereCondition.id = id;
        }

        if (fromDate !== undefined && toDate !== undefined) {
            whereCondition.enquiryDate = { [Op.between]: [new Date(fromDate), new Date(toDate)] };
        }

        if (searchString !== undefined && searchString !== null) {

            whereCondition[Op.or] = [
                sequelize.where(sequelize.col('name'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('parentName'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('contactNo'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('class'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('previousSchool'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('villageOrCity'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('district'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('remarks'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('parentConcern'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [
                    [sequelize.col('Class.class'), 'className'],
                    [sequelize.col('Section.section'), 'sectionName']
                ]
            },
            where: whereCondition,
            include: includeConditions,
            order: [[column || 'id', sort || 'ASC']],
            limit: limit ? parseInt(limit) : undefined,
            offset: pno && limit ? parseInt(pno) * parseInt(limit) - parseInt(limit) : undefined,
        };

        const results = await Student.findAndCountAll(queryOptions);

        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "students exist" : "No students found",
            data: {
                currentPno: pno ? parseInt(pno) : 1,
                totalPages: limit ? Math.ceil(results.count / parseInt(limit)) : 1,
                totalRecords: results.count,
                totalPageCount: results.rows.length,
                rows: results.rows
            }
        });
    } 
    catch (error) {
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
                    parentName: data.parentName,
                    contactNo: data.contactNo,
                    class: data.class,
                    previousSchool: data.previousSchool,
                    villageOrCity: data.villageOrCity,
                    district: data.district,
                    followUpDate: data.followUpDate,
                    remarks: data.remarks,
                    parentConcern: data.parentConcern,
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
    studentCreateService,
    studentGetService
}