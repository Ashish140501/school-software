const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const sequelize = require('sequelize');
const { validationResult, matchedData } = require('express-validator');

const { School, User, Role, Permission, RoleHasPermission } = require('../../models')

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
                    status: 1,
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

module.exports = {
    schoolOnboardService,
    schoolLoginService,
};