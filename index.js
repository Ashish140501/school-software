'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const passport = require('passport');
const routerHandler = require('./routes/routeHandler');
const createError = require('http-errors');
const { sequelize } = require('./models')

require('dotenv').config();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());
app.use(cors()); 
app.use(passport.initialize());

const port = process.env.APP_PORT || 5000 ;
// app.set('env', 'development');

// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//       const errStatus = err.statusCode;
//       const errMsg = err.message;
//       console.log("development error handler");
//       console.log(err);
//       return res.status(errStatus).json({
//         "code": errStatus,
//         "message": errMsg,
//         "data": []
//       });
//     });
//   }

app.use(function (err, req, res, next) {
    const errStatus = err.statusCode;
    const errMsg = err.message;
    return res.status(errStatus).json({
        "code": errStatus,
        "message": errMsg,
        "data": []
    });
});

app.use('/api', routerHandler);

app.use('/', (req, res, next) => {
    res.status(200).json({
        "message": "Welcome, School"
    })
});

app.use(function (req, res, next) {
    console.log("came");
    next(createError(404, "404 Not Found"));
});

app.listen({ port }, async () => {
    console.log(`Server up on http://localhost:${port}`)
    await sequelize.authenticate()
    console.log('Database Connected!')
})


