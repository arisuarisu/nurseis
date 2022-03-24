const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getClients() {
    const data = await db.query(
      'SELECT id AS key, firstname, lastname, address FROM clients', []
    );
    return data
  }

  // async function getClientsWithDiagnosis() {
  //   const data = await db.query(
  //     'SELECT id AS key, firstname, lastname, address FROM clients JOIN ', []
  //     );
  //     return data
  //   }

  async function newClient(firstname, lastname, address, diagnosis) { //doriesit co sa bude vracat
    console.log(diagnosis, diagnosis.length)
      const data = await db.query(
        'INSERT INTO clients(firstname, lastname, address) VALUES($1, $2, $3) RETURNING id', [firstname, lastname, address]
      );
      console.log(data, data[0].id)
      //for (let i = 0; i < diagnosis.length; i++) {
      // const data2 = await db.query(
      //   'INSERT INTO diagnosis(id_diagnosis, id_client) VALUES($1, $2) RETURNING *', [diagnosis[i], data[0].id]
      // );
      //}
      return data
    }


  module.exports = {
    getClients,
    newClient
  }