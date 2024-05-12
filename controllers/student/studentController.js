const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, Student, Family, Class, Section, Transport } = require('../../models')


studentCreateService = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
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
                transportId: data.transportId,
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
                studentPhoto: req.files['studentPhoto'] ? req.files['studentPhoto'][0].location : '',
                casteCertificate: req.files['casteCertificate'] ? req.files['casteCertificate'][0].location : '',
                aadharCard: req.files['aadharCard'] ? req.files['aadharCard'][0].location : '',
                birthCertificate: req.files['birthCertificate'] ? req.files['birthCertificate'][0].location : '',
                transferCertificate: req.files['transferCertificate'] ? req.files['transferCertificate'][0].location : '',
                characterCertificate: req.files['characterCertificate'] ? req.files['characterCertificate'][0].location : '',
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
                    uploadPanCard: req.files['uploadPanCard'] ? req.files['uploadPanCard'][0].location : '',
                    fatherName: data.fatherName,
                    fatherQualification: data.fatherQualification,
                    fatherOccupation: data.fatherOccupation,
                    fatherIncome: data.fatherIncome,
                    fatherAadharCard: req.files['fatherAadharCard'] ? req.files['fatherAadharCard'][0].location : '',
                    fatherPhoto: req.files['fatherPhoto'] ? req.files['fatherPhoto'][0].location : '',
                    Address: data.Address,
                    fatherMobileNo: data.fatherMobileNo,
                    fatherEmail: data.fatherEmail,
                    motherName: data.motherName,
                    motherQualification: data.motherQualification,
                    motherOccupation: data.motherOccupation,
                    motherIncome: data.motherIncome,
                    motherAadharCard: req.files['motherAadharCard'] ? req.files['motherAadharCard'][0].location : '',
                    motherPhoto: req.files['motherPhoto'] ? req.files['motherPhoto'][0].location : '',
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
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};

studentUpdateService = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            let student = await Student.findOne({ where: { id: data.id }})
            if(!student)
                return res.status(400).json({
                    "code": 400,
                    "message": "student not exist",
                    "data": []
                }); 

                console.log('uploads check')
                console.log(req.body.birthCertificate)
                console.log(typeof req.body.birthCertificate)

                console.log(req.body.uploadPanCard)
                console.log(typeof req.body.uploadPanCard)

                console.log(req.body.characterCertificate)
                console.log(typeof req.body.characterCertificate)

            let studentUpdate = await Student.update(
                {
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
                    transportId: data.transportId,
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
                    studentPhoto: imageValidation( req.body.studentPhoto, 'studentPhoto', req ),
                    casteCertificate: imageValidation( req.body.casteCertificate, 'casteCertificate', req ),
                    aadharCard: imageValidation( req.body.aadharCard, 'aadharCard', req ),
                    birthCertificate: imageValidation( req.body.birthCertificate, 'birthCertificate', req ),
                    transferCertificate: imageValidation( req.body.transferCertificate, 'transferCertificate', req ),
                    characterCertificate: imageValidation( req.body.characterCertificate, 'characterCertificate', req ),
                    studentId: data.studentId,
                    status: 1,
                },
                {
                    where: {
                        id: student.id,
                        schoolId: req.user.schoolId,
                    }
                }
            );
            if (studentUpdate > 0) {
                let familyCreate = await Family.update(
                    {
                        bankName: data.bankName,
                        bankBranch: data.bankBranch,
                        IFSCCode: data.IFSCCode,
                        accountNo: data.accountNo,
                        panNo: data.panNo,
                        uploadPanCard: imageValidation( req.body.uploadPanCard, 'uploadPanCard', req ),
                        fatherName: data.fatherName,
                        fatherQualification: data.fatherQualification,
                        fatherOccupation: data.fatherOccupation,
                        fatherIncome: data.fatherIncome,
                        fatherAadharCard: imageValidation( req.body.fatherAadharCard, 'fatherAadharCard', req ),
                        fatherPhoto: imageValidation( req.body.fatherPhoto, 'fatherPhoto', req ),
                        Address: data.Address,
                        fatherMobileNo: data.fatherMobileNo,
                        fatherEmail: data.fatherEmail,
                        motherName: data.motherName,
                        motherQualification: data.motherQualification,
                        motherOccupation: data.motherOccupation,
                        motherIncome: data.motherIncome,
                        motherAadharCard: imageValidation( req.body.motherAadharCard, 'motherAadharCard', req ),
                        motherPhoto: imageValidation( req.body.motherPhoto, 'motherPhoto', req ),
                        motherMobileNo: data.motherMobileNo,
                        motherEmail: data.motherEmail,
                        fatherAadharNo: data.fatherAadharNo,
                        motherAadharNo: data.motherAadharNo
                    },
                    {
                        where: {
                            schoolId: req.user.schoolId,
                            studentId: student.id,
                        }
                    }
                );

                return res.status(200).json({
                    "code": 200,
                    "message": "student details updated successfully",
                    "data": []
                });
            }
            else {
                return res.status(400).json({
                    "code": 400,
                    "message": "student details cannot be updated",
                    "data": []
                });
            }
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "student details update cannot be processed",
                "data": result.array()
            });
        }
    }
    catch (err) {
        console.log(err);
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
            { model: Section, required: true, attributes: [], where: { schoolId: req.user.schoolId } },
            { model: Class, required: true, attributes: [], where: { schoolId: req.user.schoolId } },
            { model: Transport, required: true, attributes: [], where: { schoolId: req.user.schoolId } },
            { model: Family, attributes: { exclude: ['id', 'schoolId', 'createdAt', 'updatedAt'] }, where: { schoolId: req.user.schoolId } },
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
                sequelize.where(sequelize.col('firstName'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('lastName'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('fatherName'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('contactNo'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('class'), { [Op.iLike]: `%${searchString}%` }),
                // sequelize.where(sequelize.col('admissionDate'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('Class.class'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('Section.section'), { [Op.iLike]: `%${searchString}%` }),
            ];
        }

        const queryOptions = {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'schoolId',],
                include: [
                    [sequelize.col('Class.class'), 'className'],
                    [sequelize.col('Section.section'), 'sectionName'],
                    [sequelize.col('Family.id'), 'familyId'],
                    [sequelize.col('Transport.pickUp'), 'transport']
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
        console.log(error)
        next(createError(500, "Something went wrong: " + error.message));
    }
};

imageValidation = ( field, value, req ) => {

    if(req.files && req.files[value]){
        return req.files[value][0].location;
    };

    if(field == null || field == ''){
        return ''
    };

    if(field){
        return field
    };
}

module.exports = {
    studentCreateService,
    studentUpdateService,
    studentGetService
}