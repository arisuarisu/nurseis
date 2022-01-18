const express = require('express');
const router = express.Router();
const cats = require('../services/diagnosis');
let Session = require("supertokens-node/recipe/session");

router.get('/', Session.verifySession(), async function(req, res, next) {
  try {
    console.log(req.body.name, "vypisujem diagnozy")
    res.json(await diagnosis.getDiagnosis());
  } catch (err) {
    console.error(`Error while getting diagnosis`, err.message);
    next(err);
  }
});

module.exports = router;