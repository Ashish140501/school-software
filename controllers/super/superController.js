const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult, matchedData } = require('express-validator');
const { School, User, Role, Permission, RoleHasPermission } = require('../../models');
const sendResetPasswordEmail = require('../../utils/mailer');
const { Op } = require('sequelize')

// Get list of all schools
const schoolListGetService = async (req, res, next) => {
    try {

        let { pno, limit, searchString } = req.query

        const queryOptions = {
            limit: limit ? parseInt(limit) : undefined,
            offset: pno && limit ? parseInt(pno) * parseInt(limit) - parseInt(limit) : undefined,
            order: [['createdAt', 'DESC']],
        };

        if (searchString) {
            queryOptions.where = {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${searchString}%` } }, // Search in name
                    { contactPerson: { [Op.iLike]: `%${searchString}%` } }, // Search in contactpersony
                ]
            };
        }

        const results = await School.findAndCountAll(queryOptions);
        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "Schools exist" : "No school found",
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
}

// add new school
const schoolAddNewService = async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            console.log(data);
            let [school, schoolCreated] = await School.findOrCreate({
                where: { name: data.name },
                defaults: {
                    name: data.name,
                    logo: req.files['logo'] ? req.files['logo'][0].location : '',
                    banner: req.files['banner'] ? req.files['banner'][0].location : '',
                    contactNo: data.contactNo,
                    contactPerson: data.contactPerson,
                    alternateContactNo: data.alternateContactNo,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    website: data.website,
                    status: 1,
                    settings: 0
                }
            });

            if (schoolCreated) {

                let role = await Role.create({
                    name: 'ADMIN',
                    schoolId: school.id
                })
                if (role) {
                    let getpermission = await Permission.findOne({
                        where: {
                            name: "CAN_ACCESS_ALL"
                        },
                    });
                    let assignPermissionsToRole = await RoleHasPermission.create({
                        roleId: role.id,
                        permissionId: getpermission.id
                    });
                }

                admissionListSeed(school.id)

                let saltResult = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || 10));
                let hashedPwd = await bcrypt.hash("Password123@", saltResult);

                let [user, userCreated] = await User.findOrCreate(
                    {
                        where: {
                            schoolId: school.id
                        },
                        defaults: {
                            name: data.contactPerson,
                            email: data.adminEmail,
                            mobileNo: data.contactNo,
                            pwd: hashedPwd,
                            // imageUrl: data.imageUrl,
                            roleId: role.id,
                            status: data.status,
                        }
                    });

                if (userCreated) {
                    // Generate reset token
                    const resetToken = jwt.sign(
                        { userId: user.email },
                        process.env.JWT_SECRET || "123",
                        { expiresIn: '6h' }
                    );

                    // Send reset password email
                    const resetLink = await sendResetPasswordEmail(user.name, user.email, resetToken, true);
                    return res.status(200).json({
                        "code": 200,
                        "message": " School added Successfully !!",
                        "data": {
                            admin: user,
                            school: school,
                            resetLink: resetLink
                        }
                    });
                }
                else {
                    if (user) {
                        return res.status(200).json({
                            "code": 200,
                            "message": "user already exist",
                            "data": []
                        });
                    }
                    else {
                        return res.status(400).json({
                            "code": 400,
                            "message": "user cannot be created",
                            "data": []
                        });
                    }
                }
            }
            else {
                if (school) {
                    return res.status(200).json({
                        "code": 200,
                        "message": "school cannot be Created??",
                        "data": []
                    });
                }
                else {
                    return res.status(400).json({
                        "code": 400,
                        "message": "school already exists",
                        "data": []
                    });
                }
            }
        } else {
            console.log(result.array());
            return res.status(422).json({
                "code": 422,
                "message": "Create cannot be processed ??",
                "data": [result.array()]
            });
        }
    }
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

// Update one school
const schoolUpdateService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, return them
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.query
        if (!id) return res.status(400).json({ message: "Id is required" });
        const data = matchedData(req);
        let updateFields = {};
        if (data.name) updateFields.name = data.name;
        //if (data.logo) updateFields.logo = data.logo;
        //if (data.banner) updateFields.banner = data.banner;
        if (data.contactNo) updateFields.contactNo = data.contactNo;
        if (data.contactPerson) updateFields.con = data.contactPerson;
        if (data.alternateContactNo) updateFields.alternateContactNo = data.alternateContactNo;
        if (data.address) updateFields.address = data.address;
        if (data.website) updateFields.website = data.website;
        if (data.city) updateFields.city = data.city;
        if (data.state) updateFields.state = data.state;

        const [result] = await School.update(updateFields, { where: { id: id } });

        return res.status(200).json({
            code: result > 0 ? 200 : 404,
            message: result > 0 ? "School updated" : "School not found",
        })
    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
}

// Toggle block status
const schoolBlockAccess = async (req, res, next) => {
    try {
        let { id } = req.query

        const school = await School.findOne(
            {
                where: { id: id }
            }
        )

        const updatedStatus = school.status === 1 ? 0 : 1;
        const updateFields = { status: updatedStatus };
        updateFields.blockedAt = Date();
        const result = await School.update(updateFields, { where: { id: id } });
        console.log(updateFields);
        return res.status(200).json({
            code: result > 0 ? 200 : 404,
            message: "Status updated",
            data: updateFields
        });

    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
}

// Toggle settings status
const schoolSettingsEnable = async (req, res, next) => {
    try {
        let { id } = req.query

        const school = await School.findOne(
            {
                where: { id: id }
            }
        )

        const updatedsettings = school.settings === 1 ? 0 : 1
        const result = await School.update(
            {
                settings: updatedsettings
            },
            { where: { id: id } }
        )
        return res.status(200).json({
            code: 200,
            message: "Settings updated",
            data: {
                status: updatedsettings
            }
        });

    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
}



module.exports = {
    schoolUpdateService,
    schoolAddNewService,
    schoolListGetService,
    schoolBlockAccess,
    schoolSettingsEnable
}