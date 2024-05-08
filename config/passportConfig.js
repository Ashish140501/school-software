const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "Avadoha_dasvande"
};

module.exports = passport => {
    passport.use(
        new Strategy(options, async(jwt_payload, done) => {
            try {
                console.log(jwt_payload);
                const result = await User.findOne(
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