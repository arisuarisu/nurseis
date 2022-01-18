const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getEmployees() {
    const rows = await db.query(
      'SELECT id, firstname, lastname, role FROM employees ORDER BY lastname', []
    );
    const data = helper.emptyOrRows(rows);
    return data
  }


  module.exports = {
    getEmployees
  }