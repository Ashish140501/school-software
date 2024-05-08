const createError = require('http-errors');
const express = require('express');
const { body, query, checkSchema, check } = require('express-validator');

const router = express.Router();
const multer = require('multer'); 
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

//----controllers----//
const { 
    enquiryCreateService,
    enquiryGetService,
    enquiryUpdateService,
    enquiryDeleteService 
} = require('../controllers/enquiry/enquiryController')

const {
    classCreateService,
    classGetService,
    classUpdateService,
    classDeleteService,
} = require('../controllers/settings/classController')

const {
    sectionGetService
} = require('../controllers/settings/sectionController')

const {
    tableListCreate,
    tableListUpdate,
    tableListGet
} = require('../controllers/settings/tableListController')

const {
    villageCreateService,
    villageGetService,
    districtCreateService,
    districtGetService
} = require('../controllers/admin/locationController')

const {
    enquiryCount
} = require('../controllers/dashboard/dashboardController')

const {
    studentCreateService,
    studentGetService
} = require('../controllers/student/studentController')


//----validations----//
const { 
    enquiryCreateValidation,
    enquiryUpdateValidation,
    enquiryDeleteValidation 
} = require('../validations/enquiryValidations')

const { 
    classCreateValidation,
    classUpdateValidation 
} = require('../validations/classValidations')

const {
    tableListCreateValidation,
    tableListUpdateValidation
} = require('../validations/tableListValidations')

const {
    studentCreateValidation
} = require('../validations/studentValidations')

let s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            // console.log("filename");
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname)
        }
    })
});

//--enquiry-routes--//
router.post('/enquiry/create', checkSchema(enquiryCreateValidation), (req, res, next) => {
    enquiryCreateService(req, res, next);
});

router.post('/enquiry/update', checkSchema(enquiryUpdateValidation), (req, res, next) => {
    enquiryUpdateService(req, res, next);
});

router.post('/enquiry/delete', checkSchema(enquiryDeleteValidation), (req, res, next) => {
    enquiryDeleteService(req, res, next);
});

router.get('/enquiry/get', (req, res, next) => {
    enquiryGetService(req, res, next);
});


//--class-routes--//
router.post('/class/create', checkSchema(classCreateValidation), (req, res, next) => {
    classCreateService(req, res, next);
});

router.post('/class/update', checkSchema(classUpdateValidation), (req, res, next) => {
    classUpdateService(req, res, next);
});

router.get('/class/get', (req, res, next) => {
    classGetService(req, res, next);
});

router.get('/section/get', (req, res, next) => {
    sectionGetService(req, res, next);
});


//--student-routes--//
router.post('/student/create', checkSchema(studentCreateValidation), upload.fields([
    { name: 'studentPhoto', maxCount: 1 }, 
    { name: 'casteCertificate', maxCount: 1 }, 
    { name: 'birthCertificate', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'transferCertificate', maxCount: 1 },
    { name: 'fatherAadharCard', maxCount: 1 },
    { name: 'fatherPhoto', maxCount: 1 },
    { name: 'MotherAadhardCard', maxCount: 1 },
    { name: 'motherPhoto', maxCount: 1 },
  ]), (req, res, next) => {
    studentCreateService(req, res, next);
});

router.get('/student/get', (req, res, next) => {
    studentGetService(req, res, next);
});


//--location-routes--//
router.post('/village/create', (req, res, next) => {
    villageCreateService(req, res, next);
});

router.get('/village/get', (req, res, next) => {
    villageGetService(req, res, next);
});

router.post('/district/create',  (req, res, next) => {
    districtCreateService(req, res, next);
});

router.get('/district/get', (req, res, next) => {
    districtGetService(req, res, next);
});


//--dashboard-apis--//
router.get('/dashboard/enquiry/count', (req, res, next) => {
    enquiryCount(req, res, next);
});


//--table-list--//
router.post('/table-list/create', checkSchema(tableListCreateValidation), (req, res, next) => {
    tableListCreate(req, res, next);
});

router.post('/table-list/update', checkSchema(tableListUpdateValidation), (req, res, next) => {
    tableListUpdate(req, res, next);
});

router.get('/table-list/get', (req, res, next) => {
    tableListGet(req, res, next);
});


router.use((req, res, next) => {
    next(createError(404, "Not found"));
});

module.exports = router;