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
      'SELECT id AS key, firstname, lastname, phone, img, contractf, contractt, gdpr, vaccine FROM employees WHERE role=$1 ORDER BY lastname', ['nurse']
    );
    //const data = helper.emptyOrRows(rows);
    return data
  }

  async function newEmployee(firstname, lastname, phone, contractf, contractt, gdpr, vaccine) {
      const data = await db.query(
        'INSERT INTO employees(firstname, lastname, password, role, phone, contractf, contractt, gdpr, vaccine) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [firstname, lastname, 'asdasd', 'nurse', phone, contractf, contractt, gdpr, vaccine]
      );
      return data
    }

    async function editEmployee(id, firstname, lastname, phone, contractf, contractt, gdpr, vaccine) { //doriesit co sa bude vracat
      //console.log(diagnosis, diagnosis.length)
        const data = await db.query(
          'UPDATE employees SET firstname=$1, lastname=$2, phone=$3, contractf=$4, contractt=$5, gdpr=$6, vaccine=$7 WHERE id=$8', [firstname, lastname, phone, contractf, contractt, gdpr, vaccine, BigInt(id)]
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