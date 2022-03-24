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

  async function newEmployee(firstname, lastname) {
      const data = await db.query(
        'INSERT INTO employees(firstname, lastname, password) VALUES($1, $2, $3) RETURNING *', [firstname, lastname, 'asdasd']
      );
      return data
    }


  module.exports = {
    getEmployees,
    newEmployee
  }