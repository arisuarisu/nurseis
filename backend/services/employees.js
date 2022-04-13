const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getEmployees() {
    const data = await db.query(
      'SELECT id AS key, firstname, lastname, role FROM employees ORDER BY lastname', []
    );
    //const data = helper.emptyOrRows(rows);
    return data
  }

  async function getNurseNames() {
    const data = await db.query(
      "SELECT id AS key, firstname, lastname FROM employees WHERE role='nurse' ORDER BY lastname", []
    );
    //const data = helper.emptyOrRows(rows);
    return data
  }

  async function getNurses() {
    const data = await db.query(
      'SELECT id AS key, firstname, lastname, img FROM employees WHERE role=$1 ORDER BY lastname', ['nurse']
    );
    //const data = helper.emptyOrRows(rows);
    return data
  }

  async function newEmployee(firstname, lastname) {
      const data = await db.query(
        'INSERT INTO employees(firstname, lastname, password, role) VALUES($1, $2, $3, $4) RETURNING *', [firstname, lastname, 'asdasd', 'nurse']
      );
      return data
    }

    async function editEmployee(id, firstname, lastname) { //doriesit co sa bude vracat
      //console.log(diagnosis, diagnosis.length)
        const data = await db.query(
          'UPDATE employees SET firstname=$1, lastname=$2 WHERE id=$3', [firstname, lastname, id]
        );

        return data
      }

      async function searchEmployee(lastname) {
        const data = await db.query(
          'SELECT id AS key, firstname, lastname FROM employees WHERE role=$1 AND lastname ~ $2 ORDER BY lastname', ['nurse', lastname]
        );
        //const data = helper.emptyOrRows(rows);
        console.log('vypisujem search nursky podla priezviska services', data)
        return data
      }

      async function deleteEmployee(id) {
        const data = await db.query(
          'DELETE FROM employees WHERE id=$1', [id]
        );
        return data
      }

  module.exports = {
    getEmployees,
    getNurses,
    getNurseNames,
    newEmployee,
    editEmployee,
    searchEmployee,
    deleteEmployee
  }