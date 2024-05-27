const createError = require('http-errors');
const path = require('path');
const { Sequelize, Op, where } = require('sequelize');
const lodash = require('lodash');
const { validationResult, matchedData } = require('express-validator');

const { sequelize, Student, Family, Class, Section, Transport, School, Caste, Religion } = require('../../models')


studentBulkCreateService = async (req, res, next) => {
    try {
        // let result = validationResult(req);
        // if (!result.isEmpty()) {
        //     return res.status(422).json({
        //         code: 422,
        //         message: "Validation failed",
        //         data: result.array()
        //     });
        // }

        let data = req.body;
        let students = data.students;
        let createdStudents = [];
        let errors = [];

        for (let studentData of students) {
            const [classInstance, classCreated] = await Class.findOrCreate({
                where: {
                    schoolId: parseInt(req.user.schoolId),
                    class: studentData.class.toString()
                },
                defaults: {
                    status: 1,
                }
            });

            const [sectionInstance, sectionCreated] = await Section.findOrCreate({
                where: {
                    schoolId: parseInt(req.user.schoolId),
                    classId: classInstance.id,
                    section: studentData.section
                },
                defaults: {
                    status: 1,
                }
            });

            let existingStudent = await Student.findOne(
                {
                    where:
                    {
                        schoolId :  parseInt(req.user.schoolId),
                        session: studentData.session,
                        admissionNo: studentData.admissionNo
                    }
                });

            if (existingStudent) {
                errors.push({
                    code: 400,
                    message: "Student already exists for admissionNo: " + studentData.admissionNo,
                    data: studentData
                });
                continue; // Skip to next
            }

            try {
                let newStudent = await Student.create({
                    schoolId: parseInt(req.user.schoolId),
                    session: studentData.session,
                    admissionDate: studentData.admissionDate,
                    admissionNo: studentData.admissionNo,
                    rollNo: studentData.rollNo,
                    firstName: studentData.firstName,
                    lastName: studentData.lastName,
                    contactNo: studentData.contactNo,
                    fatherName: studentData.fatherName,
                    classId: classInstance.id,
                    sectionId: sectionInstance.id,
                    studentType: studentData.studentType,
                    gender: studentData.gender,
                    DOB: studentData.DOB,
                    caste: studentData.caste,
                    religion: studentData.religion,
                    familyId: studentData.familyId,
                    studentId: studentData.studentId,
                    status: 1,
                });

                await Family.create({
                    schoolId: req.user.schoolId,
                    studentId: newStudent.id,
                    Address: studentData.address,
                    fatherName: studentData.fatherName,
                });

                createdStudents.push(newStudent);
            } catch (error) {
                errors.push({
                    code: 400,
                    message: "Student creation failed for admissionNo: " + studentData.admissionNo,
                    data: studentData,
                    error: error.message
                });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                code: 400,
                message: "Errors occurred during student creation",
                errors: errors
            });
        }

        return res.status(200).json({
            code: 200,
            message: "Students created successfully",
            data: createdStudents
        });
    } catch (err) {
        console.log(err);
        next(createError(500, "Something went wrong " + err.message));
    }
};







studentCreateService = async (req, res, next) => {
    try {
        let result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            console.log(data);

            let admission = await Student.max('admissionNo', { where: { schoolId: req.user.schoolId } })
            if (admission) {
                admission = parseInt(admission) + 1
            }
            else {
                admission = await School.findOne({ attributes: ['admissionNoSeq'], where: { id: req.user.schoolId } })
                admission = admission.admissionNoSeq;
            }

            let rollNo = await Student.max('rollNo', { where: { schoolId: req.user.schoolId, classId: data.classId } })

            if (rollNo) {
                rollNo = parseInt(rollNo) + 1
            }
            else {
                rollNo = await School.findOne({ attributes: ['rollNoSeq'], where: { id: req.user.schoolId } });
                rollNo = rollNo.rollNoSeq
            }

            let results = await Student.create({
                schoolId: parseInt(req.user.schoolId),
                session: data.session,
                admissionDate: data.admissionDate,
                admissionNo: admission,
                rollNo: rollNo,
                firstName: data.firstName,
                lastName: data.lastName,
                contactNo: data.contactNo,
                fatherName: data.fatherName,
                classId: parseInt(data.classId),
                sectionId: parseInt(data.sectionId),
                studentType: data.studentType,
                staffNo: data.staffNo,
                rte: data.rte,
                rteApplicationNo: data.rteApplicationNo,
                availingTransport: data.availingTransport,
                transportId: data.transportId == '' ? null : data.transportId,
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
                if (familyCreate) {

                    let [caste, casteCreated] = await Caste.findOrCreate({
                        where: {
                            caste: data.caste
                        }
                    })

                    let [religion, religionCreated] = await Religion.findOrCreate({
                        where: {
                            religion: data.religion
                        }
                    })

                    return res.status(200).json({
                        "code": 200,
                        "message": "student and family created successfully",
                        "data": []
                    });
                }
                else {
                    return res.status(400).json({
                        "code": 400,
                        "message": "family cannot be created",
                        "data": []
                    });
                }
            }
            else {
                return res.status(400).json({
                    "code": 400,
                    "message": "student cannot be created",
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
            let student = await Student.findOne({ where: { id: data.id } })
            if (!student)
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
                    studentPhoto: imageValidation(req.body.studentPhoto, 'studentPhoto', req),
                    casteCertificate: imageValidation(req.body.casteCertificate, 'casteCertificate', req),
                    aadharCard: imageValidation(req.body.aadharCard, 'aadharCard', req),
                    birthCertificate: imageValidation(req.body.birthCertificate, 'birthCertificate', req),
                    transferCertificate: imageValidation(req.body.transferCertificate, 'transferCertificate', req),
                    characterCertificate: imageValidation(req.body.characterCertificate, 'characterCertificate', req),
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
                        uploadPanCard: imageValidation(req.body.uploadPanCard, 'uploadPanCard', req),
                        fatherName: data.fatherName,
                        fatherQualification: data.fatherQualification,
                        fatherOccupation: data.fatherOccupation,
                        fatherIncome: data.fatherIncome,
                        fatherAadharCard: imageValidation(req.body.fatherAadharCard, 'fatherAadharCard', req),
                        fatherPhoto: imageValidation(req.body.fatherPhoto, 'fatherPhoto', req),
                        Address: data.Address,
                        fatherMobileNo: data.fatherMobileNo,
                        fatherEmail: data.fatherEmail,
                        motherName: data.motherName,
                        motherQualification: data.motherQualification,
                        motherOccupation: data.motherOccupation,
                        motherIncome: data.motherIncome,
                        motherAadharCard: imageValidation(req.body.motherAadharCard, 'motherAadharCard', req),
                        motherPhoto: imageValidation(req.body.motherPhoto, 'motherPhoto', req),
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
            { model: Transport, required: false, attributes: [], where: { schoolId: req.user.schoolId } },
            { model: Family, required: true, attributes: { exclude: ['id', 'schoolId', 'createdAt', 'updatedAt'] }, where: { schoolId: req.user.schoolId } },
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
                sequelize.where(sequelize.col('Student.firstName'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('Student.lastName'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('Student.fatherName'), { [Op.iLike]: `%${searchString}%` }),
                sequelize.where(sequelize.col('Student.contactNo'), { [Op.iLike]: `%${searchString}%` }),
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
        console.log(results.rows);
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

imageValidation = (field, value, req) => {

    if (req.files && req.files[value]) {
        return req.files[value][0].location;
    };

    if (field == null || field == '') {
        return ''
    };

    if (field) {
        return field
    };
}

module.exports = {
    studentBulkCreateService,
    studentCreateService,
    studentUpdateService,
    studentGetService
}