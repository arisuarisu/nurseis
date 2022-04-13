const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const photos = require('../services/photos');

router.get('/', verifySession(), async function(req, res, next) {
  try {
    //console.log(req.body.name, "vypisujem zamestnancov")
    res.json(await photo.getPhotos());
  } catch (err) {
    console.error(`Error while getting photos`, err.message);
    next(err);
  }
});

router.post('/new', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.datetime, " vypisujem arrival")
    res.json(await photos.newPhoto(req.body.photo));
  } catch (err) {
    console.error(`Error while writing a new photo`, err.message);
    next(err);
  }
});

router.post('/edit', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    res.json(await photos.editPhoto(req.body.id, req.body.photo));
  } catch (err) {
    console.error(`Error while editing a photo`, err.message);
    next(err);
  }
});

router.post('/delete', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    res.json(await photos.deletePhoto(req.body.id));
  } catch (err) {
    console.error(`Error while deleting a photo`, err.message);
    next(err);
  }
});

module.exports = router;