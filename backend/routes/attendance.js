const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const attendance = require('../services/attendance');

router.get('/', verifySession(), async function(req, res, next) { //DOPLNIT ZISKAVANIE ID
  try {
    // let id = req.session.getUserId();
    //console.log(req.query.date, "vypisujem att date")
    res.json(await attendance.getDay(req.query.date));
  } catch (err) {
    console.error(`Error while getting day attendance`, err.message);
    next(err);
  }
});

router.get('/last', verifySession(), async function(req, res, next) { //DOPLNIT ZISKAVANIE ID
  try {
    // let id = req.session.getUserId();
    // console.log(res.body.firstname, "vypisujem klientov")
    res.json(await attendance.getLastAction(1));
  } catch (err) {
    console.error(`Error while getting last action`, err.message);
    next(err);
  }
});

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
    //let id = req.session.getUserId();
    //console.log(req.body.datetime, " vypisujem arrival")
    res.json(await attendance.writeArr(1, req.body.datetime));
  } catch (err) {
    console.error(`Error while writing arr`, err.message);
    next(err);
  }
});

router.post('/dep', verifySession(), async function(req, res, next) {
    try {
      //let id = req.session.getUserId();
      //console.log(req.body.datetime, "vypisujem departure")
      res.json(await attendance.writeDep(1, req.body.datetime, req.body.reason));
    } catch (err) {
      console.error(`Error while writing dep`, err.message);
      next(err);
    }
  });

module.exports = router;