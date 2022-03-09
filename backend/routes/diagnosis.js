const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const diagnosis = require('../services/diagnosis');

router.get('/', verifySession(), async function(req, res, next) {
  try {
    console.log(req.body.name, "vypisujem diagnozy")
    res.json(await diagnosis.getDiagnosis());
  } catch (err) {
    console.error(`Error while getting diagnosis`, err.message);
    next(err);
  }
});

module.exports = router;