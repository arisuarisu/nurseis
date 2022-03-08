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

module.exports = router;