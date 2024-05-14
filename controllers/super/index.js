const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { matchedData, validationResult } = require('express-validator');
const { SuperUser } = require('../../models')


superRegisterService = async (req, res, next) => {
    const result = validationResult(req);
    try {
        if (result.isEmpty()) {
            let data = matchedData(req)
            let saltRounds = parseInt(process.env.SALT_ROUNDS) || 10
            let saltResult = await bcrypt.genSalt(saltRounds);
            let hashedPwd = await bcrypt.hash(data.pwd, saltResult);
            let [superUser, superUserCreated] = await SuperUser.findOrCreate({
                where: { name: data.name },
                defaults: {
                    name: data.name,
                    email: data.email,
                    contactNo: data.contactNo,
                    pwd: hashedPwd,
                    // imageUrl: data.imageUrl,
                    //roleId: role.id, // need to setup as per roles table
                    status: 1,
                }
            });

            if (superUserCreated) {

                return res.status(200).json({
                    "code": 200,
                    "message": "Super user registered Successfully !!",
                    "data": []
                });
            }
            else {
                if (superUser) {
                    return res.status(200).json({
                        "code": 200,
                        "message": "super user already exist",
                        "data": []
                    });
                }
                else {
                    return res.status(400).json({
                        "code": 400,
                        "message": "super user cannot be created",
                        "data": []
                    });
                }
            }
        } else {
            return res.status(422).json({
                "code": 422,
                "message": "Create cannot be processed ??",
                "data": [result.array()]
            });
        }

    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
}

superLoginService = async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            let data = matchedData(req);

            let superUser = await SuperUser.findOne({ where: { email: data.email } });

            if (!superUser) {
                return res.status(404).json({
                    "code": 404,
                    "message": "Super user not found",
                    "data": []
                });
            }
            else {
                let verifiedPwd = await bcrypt.compare(data.pwd, superUser.pwd);
                if (verifiedPwd) {

                    let token = jwt.sign(
                        {
                            email: data.email
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1d' }
                    );

                    let refreshToken = jwt.sign(
                        {
                            email: data.email
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' }
                    );

                    return res.status(200).json({
                        "code": 200,
                        "message": "Login successful",
                        "data": [
                            {
                                "name": superUser.name,
                                "email": superUser.email,
                                "accessToken": token,
                                "refreshToken": refreshToken
                            }
                        ]
                    });
                }
                else {
                    return res.status(404).json({
                        "code": 404,
                        "message": "Incorrect password",
                        "data": []
                    });
                }
            }
        }
        else {
            return res.status(422).json({
                "code": 422,
                "message": "Login cannot be processed",
                "data": result.array()
            });
        }
    }
    catch (err) {
        console.log(err);
        next(createError(500, "Something went wrong: " + err.message));
    }
};





module.exports = {
    superRegisterService,
    superLoginService,
}