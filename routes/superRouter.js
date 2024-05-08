const express = require('express');
const router = express.Router();

//----controllers----//
const {
    schoolUpdateService,
    schoolListGetService,
    schoolBlockAccess,
    schoolSettingsEnable
} = require('../controllers/super/superController');







//--school-routes--//
router.get('/school/list', (req, res, next) => {
    schoolListGetService(req, res, next)
})

router.post('/school/block', (req, res, next) => {
    schoolBlockAccess(req, res, next)
})

router.post('/school/settings', (req, res, next) => {
    schoolSettingsEnable(req, res, next)
})


module.exports = router;