const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getPhotos() {
  //console.log('pred klientmi')
    const data = await db.query(
      //"SELECT c.id AS key, c.firstname, c.lastname, c.address, d.id FROM clients c LEFT JOIN diagnosis_reports dr ON c.id=dr.id_clients LEFT JOIN diagnosis d ON dr.id_diagnosis=d.id GROUP BY c.id, d.id", []
      "SELECT c.id AS key, c.firstname, c.lastname, c.address, STRING_AGG (d.name, ',') diagnoses, STRING_AGG (d.id::varchar(255), ',') diagnosis_ids FROM clients c LEFT JOIN diagnosis_reports dr ON c.id=dr.id_clients LEFT JOIN diagnosis d ON dr.id_diagnosis=d.id GROUP BY c.id", []
    );
    //console.log('data pred klientmi ', data)
    let arr=null
    let arr2=null
    for (let i = 0; i < data.length; i++) {
      //console.log(data[i].diagnoses, 'vypisujem pred split')
      if(data[i].diagnoses!==null){
        arr = data[i].diagnoses.split(',');
        data[i].diagnoses=[...arr]

        arr2 = data[i].diagnosis_ids.split(',');
        data[i].diagnosis_ids=[...arr2]
      }
    }
// console.log('za klientmi')
// console.log(data)
    return data
  }

  async function newPhoto(firstname, lastname, address, diagnosis) { //doriesit co sa bude vracat
    //console.log(firstname, lastname, address, diagnosis, 'ukladam noveho klienta')
      const data = await db.query(
        'INSERT INTO clients(firstname, lastname, address) VALUES($1, $2, $3) RETURNING id', [firstname, lastname, address]
      );
      // console.log(data, data[0].id)
      let data2 = null
      if(diagnosis!==null){
      for (let i = 0; i < diagnosis.length; i++) {
      data2 = await db.query(
        'INSERT INTO diagnosis_reports(id_diagnosis, id_client) VALUES($1, $2) RETURNING *', [diagnosis[i], data[0].id]
      );
      }
    }
      return data2
    }

    async function editPhoto(id, firstname, lastname, address, diagnosis) { //doriesit co sa bude vracat
      //console.log(diagnosis, diagnosis.length)
        const data = await db.query(
          'UPDATE clients SET firstname=$1, lastname=$2, address=$3 WHERE id=$4', [firstname, lastname, address, id]
        );
        let data2 = null
        if(diagnosis!==[]){

          const deleteexist = await db.query( //skontrolovat ci existuje
          'SELECT * FROM diagnosis_reports WHERE id_clients=$1', [id]
        );

          //console.log(deleteexist, 'vypisujem delteexist')

        if(deleteexist!==[]){
        const deletedata = await db.query( //skontrolovat ci existuje
          'DELETE FROM diagnosis_reports WHERE id_clients=$1', [id]
        );
        }

        // console.log(data, data[0].id)
        
        for (let i = 0; i < diagnosis.length; i++) {
        data2 = await db.query(
          'INSERT INTO diagnosis_reports(id_diagnosis, id_clients) VALUES($1, $2) RETURNING *', [diagnosis[i], data[0].id]
        );
        }
      }
        return data2
      }

      async function deletePhoto(id) {
        const data = await db.query(
          'DELETE FROM clients WHERE id=$1', [id]
        );
        return data
      }


  module.exports = {
    getPhotos,
    newPhoto,
    editPhoto,
    deletePhoto
  }