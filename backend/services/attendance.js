const db = require('./db');
const helper = require('../helper');
const config = require('../config');

  async function getDayAtt(day) { //
    //   const data = await db.query(
    //     'SELECT * FROM attendance_reports WHERE departure OR arrival = ', []
    //   );
    //   return data
    }

async function getMonthAtt(id, month) {
    // const data = await db.query(
    //   'SELECT id AS key, firstname, lastname, address FROM clients', []
    // );
    // return data
  }

  async function writeArrival(id) { //spravit constraints do db ze arrival po neprit a depart a depart iba po arrival
      const rows = await db.query(
        'INSERT INTO attendance_reports(id_employee, type, reason, approved, datetime) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *', 
        [id, 'prichod', '', 'n']
      );
      const data = helper.emptyOrRows(rows);
      return data
    }

    async function writeDeparture(id, reason) {
        const rows = await db.query(
            'INSERT INTO attendance_reports(id_employee, type, reason, approved, datetime) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *', 
            [id, 'odchod', reason, 'n']
          );
          const data = helper.emptyOrRows(rows);
          return data
        }

  module.exports = {
    //getTodayAtt,
    getDayAtt,
    getMonthAtt,
    writeArrival,
    writeDeparture
  }