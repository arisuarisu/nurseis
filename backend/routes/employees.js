const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const employees = require('../services/employees');

router.get('/', verifySession(), async function(req, res, next) {
  try {
    //console.log(req.body.name, "vypisujem zamestnancov")
    res.json(await employees.getEmployees());
  } catch (err) {
    console.error(`Error while getting employees`, err.message);
    next(err);
  }
});

router.post('/new', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.datetime, " vypisujem arrival")
    res.json(await clients.newEmployee(req.body.firstname, req.body.lastname));
  } catch (err) {
    console.error(`Error while writing a new employee`, err.message);
    next(err);
  }
});

module.exports = router;