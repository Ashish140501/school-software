const express = require('express');
const { checkSchema } = require('express-validator');
const router = express.Router();

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


//--school-routes--//
router.get('/school/list', (req, res, next) => {
    schoolListGetService(req, res, next)
})

router.post('/school/add', checkSchema(schoolAddNewValidation), (req, res, next) => {
    schoolAddNewService(req, res, next)
})

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