const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const employees = require('../services/employees');

router.get('/', verifySession(), async function(req, res, next) {
  try {
    //console.log(req.body.name, "vypisujem zamestnancov")
    res.json(await employees.getNurses());
  } catch (err) {
    console.error(`Error while getting employees`, err.message);
    next(err);
  }
});

router.get('/names', verifySession(), async function(req, res, next) {
  try {
    //console.log(req.body.name, "vypisujem zamestnancov")
    res.json(await employees.getNurseNames());
  } catch (err) {
    console.error(`Error while getting nurses' names`, err.message);
    next(err);
  }
});

router.post('/new', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.datetime, " vypisujem arrival")
    res.json(await employees.newEmployee(req.body.firstname, req.body.lastname, req.body.phone, req.body.contractf, req.body.contractt, req.body.gdpr, req.body.vaccine));
  } catch (err) {
    console.error(`Error while writing a new employee`, err.message);
    next(err);
  }
});

router.post('/edit', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    res.json(await employees.editEmployee(req.body.id, req.body.firstname, req.body.lastname, req.body.phone, req.body.contractf, req.body.contractt, req.body.gdpr, req.body.vaccine));
  } catch (err) {
    console.error(`Error while editing an employee`, err.message);
    next(err);
  }
});

router.post('/search', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    console.log('searchujem nursku podla priezviska ', req.body.lastname)
    res.json(await employees.searchEmployee(req.body.lastname));
  } catch (err) {
    console.error(`Error while editing an employee`, err.message);
    next(err);
  }
});

router.post('/delete', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    res.json(await employees.deleteEmployee(req.body.id));
  } catch (err) {
    console.error(`Error while editing an employee`, err.message);
    next(err);
  }
});

module.exports = router;