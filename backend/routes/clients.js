const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const clients = require('../services/clients');

router.get('/', verifySession(), async function(req, res, next) {
  try {
    // console.log(res.body.firstname, "vypisujem klientov")
    console.log('routes pred klientmi')
    res.json(await clients.getClients());
    console.log('routes za klientmi')
  } catch (err) {
    console.error(`Error while getting clients`, err.message);
    next(err);
  }
});

router.post('/new', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    console.log(req.body.firstname, req.body.lastname, req.body.address, req.body.diagnosis, 'vypisujem noveho klineta routes')
    res.json(await clients.newClient(req.body.firstname, req.body.lastname, req.body.address, req.body.diagnosis));
  } catch (err) {
    console.error(`Error while writing a new client`, err.message);
    next(err);
  }
});

router.post('/edit', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    console.log('vypisujem request ', req.body)
    console.log('vypisujem id ', req.body.id)
    console.log(req.body.firstname, req.body.lastname, req.body.address, req.body.diagnosis, 'vypisujem edit klineta routes')
    res.json(await clients.editClient(req.body.id, req.body.firstname, req.body.lastname, req.body.address, req.body.diagnosis));
  } catch (err) {
    console.error(`Error while editing a client`, err.message);
    next(err);
  }
});

router.post('/delete', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    res.json(await clients.deleteClient(req.body.id));
  } catch (err) {
    console.error(`Error while editing a client`, err.message);
    next(err);
  }
});

module.exports = router;