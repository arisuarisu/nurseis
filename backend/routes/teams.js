const express = require('express');
const {verifySession} = require("supertokens-node/recipe/session/framework/express");
const router = express.Router();
const teams = require('../services/teams');

// router.get('/', verifySession(), async function(req, res, next) {
//   try {
//     // console.log(res.body.firstname, "vypisujem klientov")
//     //console.log(await teams.getTeams())
//     res.json(await teams.getTeams(req.body.date));
//   } catch (err) {
//     console.error(`Error while getting teams`, err.message);
//     next(err);
//   }
// });

router.post('/new', verifySession(), async function(req, res, next) {
  try {
    //let id = req.session.getUserId();
    //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
    res.json(await teams.newTeam(req.body.members));
  } catch (err) {
    console.error(`Error while writing a new team`, err.message);
    next(err);
  }
});

router.post('/edit', verifySession(), async function(req, res, next) {
    try {
      //let id = req.session.getUserId();
      //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
      res.json(await teams.editTeam(req.body.id, req.body.members));
    } catch (err) {
      console.error(`Error while editing a team`, err.message);
      next(err);
    }
  });

  //delete team

  router.post('/teamadd', verifySession(), async function(req, res, next) {
    try {
      //let id = req.session.getUserId();
      //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
      res.json(await teams.addTeam(req.body.name));
    } catch (err) {
      console.error(`Error while adding an empty team`, err.message);
      next(err);
    }
  });

  router.get('/tmem', verifySession(), async function(req, res, next) {
    try {
      // console.log(res.body.firstname, "vypisujem klientov")
      //console.log(await teams.getTeams())
      res.json(await teams.getTeamMembers(req.body.date));
    } catch (err) {
      console.error(`Error while getting team members`, err.message);
      next(err);
    }
  });

  router.get('/mem', verifySession(), async function(req, res, next) {
    try {
      // console.log(res.body.firstname, "vypisujem klientov")
      //console.log(await teams.getTeams())
      res.json(await teams.getMembers(req.body.date));
    } catch (err) {
      console.error(`Error while getting members`, err.message);
      next(err);
    }
  });

  router.post('/memadd', verifySession(), async function(req, res, next) {
    try {
      //let id = req.session.getUserId();
      //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
      res.json(await teams.addMember(req.body.id_team, req.body.id_employee, req.body.mem_from, req.body.mem_to));
    } catch (err) {
      console.error(`Error while adding a member`, err.message);
      next(err);
    }
  });

  router.post('/memedit', verifySession(), async function(req, res, next) {
    try {
      //let id = req.session.getUserId();
      //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
      res.json(await teams.editMember(req.body.id, req.body.id_team, req.body.id_employee, req.body.mem_from, req.body.mem_to));
    } catch (err) {
      console.error(`Error while editing a member`, err.message);
      next(err);
    }
  });

  router.post('/memdelete', verifySession(), async function(req, res, next) {
    try {
      //let id = req.session.getUserId();
      //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
      res.json(await teams.deleteMember(req.body.id, req.body.mem_from, req.body.mem_to));
    } catch (err) {
      console.error(`Error while editing a member`, err.message);
      next(err);
    }
  });

  router.get('/tpat', verifySession(), async function(req, res, next) {
    try {
      // console.log(res.body.firstname, "vypisujem klientov")
      //console.log(await teams.getTeams())
      res.json(await teams.getTeamPatients(req.body.date));
    } catch (err) {
      console.error(`Error while getting team patients`, err.message);
      next(err);
    }
  });

  router.get('/pat', verifySession(), async function(req, res, next) {
    try {
      // console.log(res.body.firstname, "vypisujem klientov")
      //console.log(await teams.getTeams())
      res.json(await teams.getPatients(req.body.date));
    } catch (err) {
      console.error(`Error while getting patients`, err.message);
      next(err);
    }
  });

  router.post('/patadd', verifySession(), async function(req, res, next) {
    try {
      //let id = req.session.getUserId();
      //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
      res.json(await teams.addPatient(req.body.id_team, req.body.id_client, req.body.pat_from, req.body.pat_to));
    } catch (err) {
      console.error(`Error while adding a member`, err.message);
      next(err);
    }
  });

  router.post('/patedit', verifySession(), async function(req, res, next) {
    try {
      //let id = req.session.getUserId();
      //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
      res.json(await teams.editPatient(req.body.id, req.body.id_team, req.body.id_client, req.body.pat_from, req.body.pat_to));
    } catch (err) {
      console.error(`Error while editing a member`, err.message);
      next(err);
    }
  });

  router.post('/patdelete', verifySession(), async function(req, res, next) {
    try {
      //let id = req.session.getUserId();
      //console.log(req.body.diagnosis, " vypisujem diagnozy z noveho clienta")
      res.json(await teams.deletePatient(req.body.id, req.body.pat_from, req.body.pat_to));
    } catch (err) {
      console.error(`Error while editing a member`, err.message);
      next(err);
    }
  });

module.exports = router;