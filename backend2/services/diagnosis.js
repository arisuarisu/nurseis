const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getDiagnosis() {
    const rows = await db.query(
      'SELECT id, name, description, treatment FROM diagnosis ORDER BY name', []
    );
    const data = helper.emptyOrRows(rows);
    return data
  }


  module.exports = {
    getDiagnosis
  }