const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const clients = require('../services/clients');

router.get('/', verifySession(), async function(req, res, next) {
  try {
    // console.log(res.body.firstname, "vypisujem klientov")
    res.json(await clients.getClients());
  } catch (err) {
    console.error(`Error while getting clients`, err.message);
    next(err);
  }
});

router.post('/new', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    res.json(await clients.newClient(req.body.firstname, req.body.lastname, req.body.address, req.body.diagnosis));
  } catch (err) {
    console.error(`Error while writing a new client`, err.message);
    next(err);
  }
});

module.exports = router;