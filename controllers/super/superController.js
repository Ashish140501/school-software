const { where } = require('sequelize');
const { School } = require('../../models')



schoolListGetService = async (req, res, next) => {
    try {

        let { pno, limit } = req.query

        const queryOptions = {
            limit: limit ? parseInt(limit) : undefined,
            offset: pno && limit ? parseInt(pno) * parseInt(limit) - parseInt(limit) : undefined,
        };

        const results = await School.findAndCountAll(queryOptions);
        return res.status(200).json({
            code: 200,
            message: results.count > 0 ? "Schools exist" : "No school found",
            data: {
                currentPno: pno ? parseInt(pno) : 1,
                totalPages: limit ? Math.ceil(results.count / parseInt(limit)) : 1,
                totalRecords: results.count,
                totalPageCount: results.rows.length,
                rows: results.rows
            }
        });
    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
}



schoolBlockAccess = async (req, res, next) => {
    try {
        let { id } = req.query

        const school = await School.findOne(
            {
                where: { id: id }
            }
        )

        const updatedStatus = school.status === 1 ? 0 : 1
        const result = await School.update(
            {
                status: updatedStatus
            },
            { where: { id: id } }
        )
        return res.status(200).json({
            code: result > 0 ? 200 : 404,
            message: "Status updated",
            data: {
                status: updatedStatus
            }
        });

    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
}





schoolSettingsEnable = async (req, res, next) => {
    try {
        let { id } = req.query

        const school = await School.findOne(
            {
                where: { id: id }
            }
        )

        const updatedsettings = school.settings === 1 ? 0 : 1
        const result = await School.update(
            {
                settings: updatedsettings
            },
            { where: { id: id } }
        )
        return res.status(200).json({
            code: 200,
            message: "Settings updated",
            data: {
                status: updatedsettings
            }
        });

    } catch (error) {
        console.error(error);
        next(createError(500, "Something went wrong: " + error.message));
    }
}



module.exports = {
    schoolUpdateService,
    schoolListGetService,
    schoolBlockAccess,
    schoolSettingsEnable
}