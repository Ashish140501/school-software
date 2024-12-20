const createError = require('http-errors');
const express = require('express');
const { body, query, checkSchema, check } = require('express-validator');

const router = express.Router();
const multer = require('multer'); 
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

//----controllers----//

const {
    adminSettings,
    adminSettingsGet
} = require('../controllers/settings/adminSettingsController')

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
} = require('../controllers/settings/locationController')

const {
    enquiryCount
} = require('../controllers/dashboard/dashboardController')

const {
    studentBulkCreateService,
    studentCreateService,
    studentUpdateService,
    studentGetService
} = require('../controllers/student/studentController')

const {
    transportCreate,
    transportUpdate,
    transportGet,
    transportDelete
} = require('../controllers/settings/transportController')


const {
    studentTypeCreate,
    studentTypeUpdate,
    studentTypeGet,
    studentTypeDelete
} = require('../controllers/settings/studentTypeController')

const {
    casteCreate,
    casteGet,
    religionCreate,
    religionGet
} = require('../controllers/settings/casteReligionController')

const {
    sessionCreateService,
    sessionGetService,
    sessionUpdateService,
    sessionDeleteService
} = require('../controllers/settings/sessionController')


//----validations----//
const{
    settingUpdateValidation
} = require('../validations/adminValidations')

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
    studentCreateValidation,
    studentUpdateValidation,
    settingValidation,
    validateBulkStudents
} = require('../validations/studentValidations')

const {
    transportCreateValidation,
    transportUpdateValidation
} = require('../validations/transportValidations')

const {
    studentTypeCreateValidation,
    studentTypeUpdateValidation
} = require('../validations/studentTypeValidations')

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
})

//--admin-settings--//
router.get('/admin/settings/get', (req, res, next) => {
    adminSettingsGet(req, res, next);
});

router.post('/admin/settings/update', checkSchema(settingUpdateValidation), (req, res, next) => {
    adminSettings(req, res, next);
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
router.post('/student/create-bulk',checkSchema(validateBulkStudents), (req, res, next) => {
    studentBulkCreateService(req, res, next);
});


router.post('/student/create', upload.fields([
    { name: 'studentPhoto', maxCount: 1 },
    { name: 'casteCertificate', maxCount: 1 },
    { name: 'birthCertificate', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'transferCertificate', maxCount: 1 },
    { name: 'fatherAadharCard', maxCount: 1 },
    { name: 'fatherPhoto', maxCount: 1 },
    { name: 'motherAadharCard', maxCount: 1 },
    { name: 'motherPhoto', maxCount: 1 },
    { name: 'uploadPanCard', maxCount: 1 },
    { name: 'characterCertificate', maxCount: 1 },
]), checkSchema(studentCreateValidation), (req, res, next) => {
    studentCreateService(req, res, next);
});

router.post('/student/update', upload.fields([
    { name: 'studentPhoto', maxCount: 1 },
    { name: 'casteCertificate', maxCount: 1 },
    { name: 'birthCertificate', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'transferCertificate', maxCount: 1 },
    { name: 'fatherAadharCard', maxCount: 1 },
    { name: 'fatherPhoto', maxCount: 1 },
    { name: 'motherAadharCard', maxCount: 1 },
    { name: 'motherPhoto', maxCount: 1 },
    { name: 'uploadPanCard', maxCount: 1 },
    { name: 'characterCertificate', maxCount: 1 },
]), checkSchema(studentUpdateValidation), (req, res, next) => {
    studentUpdateService(req, res, next);
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


//--transport-apis--//
router.post('/transport/create', checkSchema(transportCreateValidation), (req, res, next) => {
    transportCreate(req, res, next);
});

router.post('/transport/update', checkSchema(transportUpdateValidation), (req, res, next) => {
    transportUpdate(req, res, next);
});

router.get('/transport/get', (req, res, next) => {
    transportGet(req, res, next);
});

router.post('/transport/delete', (req, res, next) => {
    transportDelete(req, res, next);
});

//--student-type-apis--//
router.post('/student-type/create', checkSchema(studentTypeCreateValidation), (req, res, next) => {
    studentTypeCreate(req, res, next);
});

router.post('/student-type/update', checkSchema(studentTypeUpdateValidation), (req, res, next) => {
    studentTypeUpdate(req, res, next);
});

router.get('/student-type/get', (req, res, next) => {
    studentTypeGet(req, res, next);
});

router.post('/student-type/delete', (req, res, next) => {
    studentTypeDelete(req, res, next);
});

//--caste-religion--//
router.post('/caste/create', (req, res, next) => {
    casteCreate(req, res, next);
});

router.get('/caste/get', (req, res, next) => {
    casteGet(req, res, next);
});

router.post('/religion/create', (req, res, next) => {
    religionCreate(req, res, next);
});

router.get('/religion/get', (req, res, next) => {
    religionGet(req, res, next);
});

//--session-routes--//
router.post('/session/create', (req, res, next) => {
    sessionCreateService(req, res, next);
});

router.get('/session/get', (req, res, next) => {
    sessionGetService(req, res, next);
});

router.post('/session/update', (req, res, next) => {
    sessionUpdateService(req, res, next);
});

router.post('/session/delete', (req, res, next) => {
    sessionDeleteService(req, res, next);
});


//------------------------------------//
router.use((req, res, next) => {
    next(createError(404, "Not found"));
});

module.exports = router;