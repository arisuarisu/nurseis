const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const diagnosis = require('../services/diagnosis');

router.get('/', verifySession(), async function(req, res, next) {
  try {
    //console.log(req.body.name, "vypisujem zamestnancov")
    res.json(await diagnosis.getDiagnosis());
  } catch (err) {
    console.error(`Error while getting diagnosis`, err.message);
    next(err);
  }
});

router.post('/new', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.datetime, " vypisujem arrival")
    res.json(await diagnosis.newDiagnosis(req.body.name, req.body.description, req.body.treatment));
  } catch (err) {
    console.error(`Error while writing a new diagnosis`, err.message);
    next(err);
  }
});

router.post('/edit', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    res.json(await diagnosis.editDiagnosis(req.body.id, req.body.name, req.body.description, req.body.treatment));
  } catch (err) {
    console.error(`Error while editing a diagnosis`, err.message);
    next(err);
  }
});

router.post('/delete', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    res.json(await employees.deleteDiagnosis(req.body.id));
  } catch (err) {
    console.error(`Error while editing a diagnosis`, err.message);
    next(err);
  }
});

module.exports = router;