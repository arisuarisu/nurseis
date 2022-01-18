const express = require('express');
const router = express.Router();
const cats = require('../services/employees');
let Session = require("supertokens-node/recipe/session");

router.get('/', Session.verifySession(), async function(req, res, next) {
  try {
    console.log(req.body.name, "vypisujem zamestnancov")
    res.json(await employees.getEmployees());
  } catch (err) {
    console.error(`Error while getting employees`, err.message);
    next(err);
  }
});

module.exports = router;