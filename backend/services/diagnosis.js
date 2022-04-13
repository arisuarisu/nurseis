const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getDiagnosis() {
  //console.log('pred klientmi')
    const data = await db.query(
      //"SELECT c.id AS key, c.firstname, c.lastname, c.address, d.id FROM clients c LEFT JOIN diagnosis_reports dr ON c.id=dr.id_clients LEFT JOIN diagnosis d ON dr.id_diagnosis=d.id GROUP BY c.id, d.id", []
      //"SELECT c.id AS key, c.firstname, c.lastname, c.address, STRING_AGG (d.name, ',') diagnoses, STRING_AGG (d.id::varchar(255), ',') diagnosis_ids FROM clients c LEFT JOIN diagnosis_reports dr ON c.id=dr.id_clients LEFT JOIN diagnosis d ON dr.id_diagnosis=d.id GROUP BY c.id", []
    'SELECT id AS key, name, description, treatment FROM diagnosis', []
      );
   
    return data
  }

  async function newDiagnosis(name, description, treatment) { //doriesit co sa bude vracat
    //console.log(firstname, lastname, address, diagnosis, 'ukladam noveho klienta')
      const data = await db.query(
        'INSERT INTO diagnosis(name, description, treatment) VALUES($1, $2, $3) RETURNING id', [name, description, treatment]
      );
      return data
    }

    async function editDiagnosis(id, name, description, treatment) { //doriesit co sa bude vracat
      //console.log(diagnosis, diagnosis.length)
        const data = await db.query(
          'UPDATE diagnosis SET name=$1, description=$2, treatment=$3 WHERE id=$4', [name, description, treatment, id]
        );
       
        return data
      }

      async function deleteDiagnosis(id) {
        const data = await db.query(
          'DELETE FROM diagnosis WHERE id=$1', [id]
        );
        return data
      }


  module.exports = {
    getDiagnosis,
    newDiagnosis,
    editDiagnosis,
    deleteDiagnosis
  }