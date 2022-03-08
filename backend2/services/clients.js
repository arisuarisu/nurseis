const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getClients() {
  //console.log("vypisujem BLABLA")
    const data = await db.query(
      'SELECT id AS key, firstname, lastname, address FROM clients', []
    );
    //console.log(rows, " vypisujem ROWS")
    //const data = helper.emptyOrRows(rows);
    //console.log(data, " vypisujem ROWS")
    return data
  }


  module.exports = {
    getClients
  }