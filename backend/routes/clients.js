const express = require('express');
const router = express.Router();
const cats = require('../services/clients');
let Session = require("supertokens-node/recipe/session");

router.get('/', Session.verifySession(), async function(req, res, next) {
  try {
    console.log(req.body.name, "vypisujem klientov")
    res.json(await clients.getClients());
  } catch (err) {
    console.error(`Error while getting clients`, err.message);
    next(err);
  }
});

module.exports = router;