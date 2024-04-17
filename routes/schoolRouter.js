const createError = require('http-errors');
const express = require('express');
const { body, query, checkSchema, check } = require('express-validator');

const router = express.Router();


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
    classDeleteService
} = require('../controllers/settings/classController')

const {
    villageCreateService,
    villageGetService,
    districtCreateService,
    districtGetService
} = require('../controllers/admin/locationController')


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

router.use((req, res, next) => {
    next(createError(404, "Not found"));
});

module.exports = router;