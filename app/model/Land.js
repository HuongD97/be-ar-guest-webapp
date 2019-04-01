var express = require("express");
var router = express.Router();
var DB = require("../db");
var _ = require("lodash");
var sqlstring = require("sqlstring");
var errorHandler = require("../../misc/errors-handler");

router.post("/getAll", async (req, res) => {
    try {
        const query = `SELECT * FROM Land;`;
        const result = await DB.runQuery(query);
        res.json(result);
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("Something went wrong in the server.");
    }
});

/**
 * Add a new land here
 */
router.post("/add", async (req, res) => {
    try {
        const { park_id, land_name } = req.body;
        if (_.isNil(park_id) || _.isNil(land_name)) {
            throw new Error("Missing park_id or land_name.");
        } else if (await landDoesExist(land_name, park_id)) {
            throw new Error(land_name + " already exists in the database.");
        }

        const query = `INSERT INTO Land (parkID, landName) VALUES (${sqlstring.escape(
            park_id
        )}, ${sqlstring.escape(land_name)});`;
        const result = await DB.runQuery(query);
        res.json({ success: true, errorMessage: "" });
    } catch (e) {
        res.json({
            success: false,
            errorMessage: errorHandler.getErrorMessage(e)
        });
    }
});

/** HElPER FUNCTIONS */
async function landDoesExist(landName, parkID) {
    const query = `select landID from Land where landName = ${sqlstring.escape(
        landName
    )} and parkID = ${sqlstring.escape(parkID)};`;
    const result = await DB.runQuery(query);

    return result.length > 0;
}

module.exports = router;
