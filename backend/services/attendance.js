const db = require('./db');
const helper = require('../helper');
const config = require('../config');

//Get today attendance of all the employees //vybrat iba posledny zapis

// async function getDayAtt(day) { //
//     //   const data = await db.query(
//     //     'SELECT * FROM attendance_reports WHERE departure OR arrival = ', []
//     //   );
//     //   return data
//     }

//Get day attendance of all employees 

async function getDay(date) {
  let data = []
  if(date===undefined || date===''){
    console.log('vnutri doch na dnes')
  data = await db.query(
    'SELECT * FROM attendance_reports WHERE EXTRACT(DAY FROM datetime) = EXTRACT(DAY FROM CURRENT_TIMESTAMP) AND EXTRACT(MONTH FROM CURRENT_TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_TIMESTAMP) AND EXTRACT(YEAR FROM datetime) = EXTRACT(YEAR FROM CURRENT_TIMESTAMP)', []
  );
  }else{
    console.log('vnutri doch na dnes s definovanym datumom')
    data = await db.query(
      'SELECT * FROM attendance_reports WHERE (EXTRACT(DAY FROM datetime) = EXTRACT(DAY FROM TIMESTAMP $1)) AND (EXTRACT(MONTH FROM datetime) = EXTRACT(MONTH FROM TIMESTAMP $2)) AND (EXTRACT(YEAR FROM datetime) = EXTRACT(YEAR FROM TIMESTAMP $3))', [date, date, date]
    );  
  }
  console.log(data, 'vypisujem data z getday')
  //data = helper.emptyOrRows(rows); //zistit co toto robi
  return data
}

//Get today attendance of a specified person //mostly me

async function getDayPerson(id, day) {
  const data = await db.query(
    'SELECT * FROM attendance_reports WHERE EXTRACT(DAY FROM datetime)=$1 AND EXTRACT(MONTH FROM datetime) = EXTRACT(MONTH FROM CURRENT_TIMESTAMP) AND EXTRACT(YEAR FROM datetime) = EXTRACT(YEAR FROM CURRENT_TIMESTAMP) AND id=$3', [day, month, id]
  );
  data = helper.emptyOrRows(rows); //zistit co toto robi
  return data
}

//Get monthly attendance of a specified person

async function getMonthPerson(id, month) { //month is number
    const data = await db.query(
      'SELECT * FROM attendance_reports WHERE EXTRACT(MONTH FROM datetime) = $1 AND EXTRACT(YEAR FROM datetime) = EXTRACT(YEAR FROM CURRENT_TIMESTAMP) AND id=$2', [month, id]
    );
    data = helper.emptyOrRows(rows); //zistit co toto robi
    return data
  }

  //Get last action (arrival/departure) of a specified person - string - to know if in work

async function getLastAction(id) {
  const data = await db.query(
    'SELECT type FROM attendance_reports WHERE id_employee=$1 ORDER BY datetime DESC FETCH FIRST ROW ONLY', [id]
  );
  console.log(data, 'vypisujem data0')
  return data[0].type
}

//Write nurse's (me) arrival to the attendance 

async function writeArr(id, datetimeArr) { //spravit constraints do db ze arrival po neprit a depart a depart iba po arrival
  //const datetimeArr = 0;    
  console.log('zapisujem dochadzku prichod do databazkyyy')
  const rows = await db.query(
        'INSERT INTO attendance_reports(id_employee, type, reason, approved, datetime) VALUES ($1, $2, $3, $4, to_timestamp($5)) RETURNING *', 
        [id, 'prichod', '', 'n', datetimeArr]
      );
      const data = helper.emptyOrRows(rows);
      return data
    }

//Write nurse's (me) departure to the attendance - need to specify type of departure

async function writeDep(id, datetimeDep, reason) {
  //const datetimeArr = 0;  
  console.log('zapisujem dochadzku odchod do databazkyyy')     
  const rows = await db.query(
            'INSERT INTO attendance_reports(id_employee, type, reason, approved, datetime) VALUES ($1, $2, $3, $4, to_timestamp($5)) RETURNING *', 
            [id, 'odchod', reason, 'n', datetimeDep]
          );
          const data = helper.emptyOrRows(rows);
          return data
        }

  module.exports = {
    getDay,
    getDayPerson,
    getMonthPerson,
    writeArr,
    writeDep,
    getLastAction
  }