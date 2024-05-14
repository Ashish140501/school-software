const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const sequelize = require('sequelize');
const { validationResult, matchedData } = require('express-validator');

const { School, User, Role, Permission, RoleHasPermission } = require('../../models')
const sendResetPasswordEmail = require('../../utils/mailer')

const { admissionListSeed } = require('../../seeders/adminSeeder')

schoolOnboardService = async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            
            let [school, schoolCreated] = await School.findOrCreate({
                where: { name: data.name },
                defaults: {
                    name: data.name,
                    // logo: '',
                    // banner: '',
                    contactNo: data.contactNo,
                    alternateContactNo: data.alternateContactNo,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    website: data.website,
                    admissionNoSeq: data.admissionNoSeq,
                    rollNoSeq: data.rollNoSeq,
                    status: 1,
                    settings: 0
                }
            });

            if (schoolCreated) {

                let role = await Role.create({
                    name: 'Admin',
                    schoolId: school.id
                })
                if (role) {
                    let getpermission = await Permission.findOne({
                        where : {
                            name: "CAN_ACCESS_ALL" 
                        },
                    });
                    let assignPermissionsToRole = await RoleHasPermission.create({
                        roleId: role.id,
                        permissionId: getpermission.id
                    });
                }
                
                admissionListSeed(school.id)

                let saltResult = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
                let hashedPwd = await bcrypt.hash(data.adminPwd, saltResult);

                let [user, userCreated] = await User.findOrCreate(
                    {
                        where: {
                            schoolId: school.id
                        },
                        defaults: {
                            name: data.adminName,
                            email: data.adminEmail,
                            mobileNo: data.adminContactNo,
                            pwd: hashedPwd,
                            // imageUrl: data.imageUrl,
                            roleId: role.id,
                            status: data.status,
                        }
                    });

                if (userCreated) {

                    return res.status(200).json({
                        "code": 200,
                        "message": " School Onboarded Successfully !!",
                        "data": []
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
        }
        else {
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
};

schoolLoginService = async (req, res, next) => { 
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);
            
            let userDetails = await User.findOne({ where: { email: data.email } });
            let schoolDetails = await School.findOne({ where: { id: userDetails.schoolId } });

            if (!userDetails) {
                return res.status(404).json({
                    "code": 404,
                    "message": "No user exists",
                    "data": []
                });
            }
            else {
                let verifiedPwd = await bcrypt.compare(data.pwd, userDetails.pwd);
                if (verifiedPwd) {

                    let token = jwt.sign(
                        {
                            email: data.email
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '8h' }
                    );

                    let refreshToken = jwt.sign(
                        {
                            email: data.email
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1d' }
                    );
                    
                    const role = await Role.findOne({
                        attributes: ['id', 'name'],
                        where: {
                            id: userDetails.roleId,
                            schoolId: userDetails.schoolId
                        },
                    })
                    if(role){
                        const rolePermissions = await RoleHasPermission.findAll({
                            attributes: [[sequelize.col('Permission.id'), 'permissionId'], [sequelize.col('Permission.name'), 'displayName'],],
                            where: {
                                roleId: role.id
                            },
                            include: [
                                {
                                    model: Permission,
                                    required: false,
                                    attributes: [],
                                }
                            ],
                        })
                        return res.status(200).json({
                            "code": 200,
                            "message": "users exists",
                            "data": [
                                {
                                    "name": userDetails.name,
                                    "email": userDetails.email,
                                    "schoolName": schoolDetails.name,
                                    "roleName": role.name,
                                    "permissions": rolePermissions,
                                    "accessToken": process.env.TOKEN_PREFIX + token,
                                    "refreshToken": process.env.TOKEN_PREFIX + refreshToken
                                }
                            ]
                        });
                    }
                    else{
                        return res.status(200).json({
                            "code": 200,
                            "message": "users exists",
                            "data": [
                                {
                                    "name": userDetails.name,
                                    "email": userDetails.email,
                                    "schoolName": schoolDetails.name,
                                    "roleName": '',
                                    "permissions": [],
                                    "access_token": process.env.TOKEN_PREFIX + token
                                }
                            ]
                        });
                    }
                }
                else {
                    return res.status(404).json({
                        "code": 404,
                        "message": "wrong password",
                        "data": []
                    });
                }
            }
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "Login cannot be processed ??",
                "data": [result.array()]
            });
        }
    }
    catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
};



schoolUpdateService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, return them
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.query
        if(!id)  return res.status(400).json({ message: "Id is required" });
        let { name, logo, banner, contactNo, alternateContactNo, address, city, state } = matchedData(req);
        const updateFields = {};
        if (name) updateFields.name = name;
        if (logo) updateFields.logo = logo;
        if (banner) updateFields.banner = banner;
        if (contactNo) updateFields.contactNo = contactNo;
        if (alternateContactNo) updateFields.alternateContactNo = alternateContactNo;
        if (address) updateFields.address = address;
        if (city) updateFields.city = city;
        if (state) updateFields.state = state;

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









schoolForgetPasswordService = async (req, res, next) => {
    try {

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // Extract email from request body
        const { email } = req.body;

        // Check if user with provided email exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: 'User not found',
                data: []
            });
        }

        // Generate reset token
        const resetToken = jwt.sign(
            { userId: user.email },
            process.env.JWT_SECRET || "123",
            { expiresIn: '1h' }
        );

        // Send reset password email
        const resetLink = await sendResetPasswordEmail(email, resetToken);

        return res.status(200).json({
            code: 200,
            message: 'Reset password email sent',
            data: {
                'reset-link': resetLink
            }
        });


    } catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

schoolResetPasswordService = async (req, res, next) => {
    try {
        const { newPwd } = req.body;
        const { token } = req.query

        console.log(token);

        if (!token || !newPwd) {
            throw new Error('Token and newPwd are required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "123");

        if (!decoded.userId) {
            throw new Error('Invalid token');
        }

        // email coded as userId
        const email = decoded.userId;

        if (!email || !newPwd) {
            throw new Error('Email and newPwd are required');
        }

        const hashedPwd = await bcrypt.hash(newPwd, 10);
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            throw new Error('User not found');
        }

        user.pwd = hashedPwd;
        await user.save();

        res.status(200).json({
            code: 200,
            message: 'Password reset successfully',
            data: []
        });
    } catch (err) {
        console.log(err);
        next(createError(500, "Some thing went wrong " + err.message));
    }
}

module.exports = {
    schoolOnboardService,
    schoolLoginService,
    schoolUpdateService,
    schoolForgetPasswordService,
    schoolResetPasswordService
};