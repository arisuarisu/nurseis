const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getClients() {
    const rows = await db.query(
      'SELECT id, firstname, lastname FROM clients ORDER BY lastname', []
    );
    console.log(" vypisujem ROWS")
    //const data = helper.emptyOrRows(rows);
    return data
  }


  module.exports = {
    getClients
  }