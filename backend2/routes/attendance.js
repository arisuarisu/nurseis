const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const attendance = require('../services/attendance');

router.get('/day', verifySession(), async function(req, res, next) { //DOPLNIT ZISKAVANIE ID
    try {
      // console.log(res.body.firstname, "vypisujem klientov")
      res.json(await attendance.getDayAtt(day));
    } catch (err) {
      console.error(`Error while getting day`, err.message);
      next(err);
    }
  });

  router.get('/month', verifySession(), async function(req, res, next) {
    try {
      // console.log(res.body.firstname, "vypisujem klientov")
      res.json(await attendance.getMonthAtt(id, month));
    } catch (err) {
      console.error(`Error while getting month`, err.message);
      next(err);
    }
  });

router.post('/arr', verifySession(), async function(req, res, next) {
  try {
    // console.log(res.body.firstname, "vypisujem klientov")
    res.json(await attendance.writeArr(id));
  } catch (err) {
    console.error(`Error while writing arr`, err.message);
    next(err);
  }
});

router.post('/dep', verifySession(), async function(req, res, next) {
    try {
      // console.log(res.body.firstname, "vypisujem klientov")
      res.json(await attendance.writeArr(id, reason));
    } catch (err) {
      console.error(`Error while writing dep`, err.message);
      next(err);
    }
  });

module.exports = router;