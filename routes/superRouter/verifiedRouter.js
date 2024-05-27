const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const router = express.Router();

const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

//----controllers----//
const {
    schoolUpdateService,
    schoolListGetService,
    schoolBlockAccess,
    schoolSettingsEnable,
    schoolAddNewService
} = require('../../controllers/super/superController');

//--validations--//
const { schoolEditValidation
} = require('../../validations/adminValidations');
const {
    schoolAddNewValidation
} = require('../../validations/superValidations');
const createHttpError = require('http-errors');


// uploads //
// AWS S3
const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    },
    sslEnabled: true,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});

// Multer S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            console.log(file);
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});

//--school-routes--//
router.get('/school/list', (req, res, next) => {
    schoolListGetService(req, res, next)
})

router.post('/school/add',
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
    ]),
    checkSchema(schoolAddNewValidation),
    (req, res, next) => {
        schoolAddNewService(req, res, next);
    }
);


router.put('/school/edit', schoolEditValidation, (req, res, next) => {
    schoolUpdateService(req, res, next)
})

router.post('/school/block', (req, res, next) => {
    schoolBlockAccess(req, res, next)
})

router.post('/school/settings', (req, res, next) => {
    schoolSettingsEnable(req, res, next)
})



//
// router.get('/student/get', (req, res, next) => {
//     studentGetService(req, res, next);
// });



module.exports = router;