const { Strategy, ExtractJwt } = require('passport-jwt');
const { SuperUser } = require('../models')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new Strategy(options, async(jwt_payload, done) => {
            try {
                console.log(jwt_payload);
                const result = await SuperUser.findOne(
                    {
                        where: {
                            email: jwt_payload.email
                        }
                    });
                if (result) {
                    return done(null, result);
                }
                else {
                    return done(null, "forbidden");
                }
            }
            catch (err) {
                console.log(err);
                return done(null, "forbidden");
            }
        })
    );
};