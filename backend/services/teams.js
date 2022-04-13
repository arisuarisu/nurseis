const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// async function getTeams(yearmonth) { //vybrat id timov s id a menami nursiek
//     console.log('vypisujem pred getteams')
//     const data = await db.query(
//       //"SELECT t.id, STRING_AGG (employees.firstname ',') members FROM teams t INNER JOIN member m ON t.id=m.id_team INNER JOIN employees e ON m.id_employee=e.id GROUP BY t.id", []
//       "SELECT t.id as key, STRING_AGG (e.firstname || ' ' ||e.lastname, ',') members, STRING_AGG (e.id::varchar(255), ',') member_ids FROM teams t INNER JOIN member m ON t.id=m.id_team INNER JOIN employees e ON m.id_employee=e.id GROUP BY t.id", []
//     );
//     console.log('vypisujem data teams ', data)
//     let arr=null
//     let arr2=null
//     for (let i = 0; i < data.length; i++) {
//         arr = data[i].members.split(',');
//         data[i].members=[...arr]

//         arr2 = data[i].member_ids.split(',');
//         data[i].member_ids=[...arr2]
//     }
//     console.log('vypisujem data teams po prerobeni dat', data)
//     return data
//   }

  async function getTeamMembers(yearmonth) { //vybrat id timov s id a menami nursiek
    console.log('vypisujem pred getteams')
    const data = await db.query(
      //"SELECT t.id, STRING_AGG (employees.firstname ',') members FROM teams t INNER JOIN member m ON t.id=m.id_team INNER JOIN employees e ON m.id_employee=e.id GROUP BY t.id", []
      "SELECT t.id as key, STRING_AGG (e.firstname || ' ' ||e.lastname, ',') members, STRING_AGG (e.id::varchar(255), ',') member_ids FROM teams t LEFT JOIN member m ON t.id=m.id_team LEFT JOIN employees e ON m.id_employee=e.id WHERE e.role='nurse' GROUP BY t.id ORDER BY t.id", []
    );
    console.log('vypisujem data teams ', data)
    let arr=null
    let arr2=null
    for (let i = 0; i < data.length; i++) {
      if(data[i].members!==null){
        arr = data[i].members.split(',');
        data[i].members=[...arr]

        arr2 = data[i].member_ids.split(',');
        data[i].member_ids=[...arr2]
      }else{
        data[i].members=[]
        data[i].member_ids=[]
      }
    }
    console.log('vypisujem data teams po prerobeni dat', data)
    return data
  }

  async function getMembers(yearmonth) {
    console.log('vypisujem yearmonth', yearmonth)
    const data = await db.query(
      "SELECT t.id AS key, m.mem_from, m.mem_to, e.firstname, e.lastname from teams t LEFT JOIN member m ON t.id=m.id_team LEFT JOIN employees e ON m.id_employee=e.id WHERE role='nurse' ORDER BY t.id", []
    );
    return data;
  }

  async function getTeamPatients(yearmonth) { //vybrat id timov s id a menami nursiek
    console.log('vypisujem pred getteams')
    const data = await db.query(
      //"SELECT t.id, STRING_AGG (employees.firstname ',') members FROM teams t INNER JOIN member m ON t.id=m.id_team INNER JOIN employees e ON m.id_employee=e.id GROUP BY t.id", []
      "SELECT t.id as key, STRING_AGG (c.firstname || ' ' ||c.lastname, ',') patients, STRING_AGG (p.id::varchar(255), ',') patient_ids FROM teams t LEFT JOIN patient p ON t.id=p.id_team LEFT JOIN clients c ON p.id_client=c.id GROUP BY t.id", []
    );
    console.log('vypisujem data teams ', data)
    let arr=null
    let arr2=null
    for (let i = 0; i < data.length; i++) {
      if(data[i].patients!==null){
        arr = data[i].patients.split(',');
        data[i].patients=[...arr]

        arr2 = data[i].patient_ids.split(',');
        data[i].patient_ids=[...arr2]
      }else{
        data[i].patients=[]
        data[i].patient_ids=[]
      }
    }
    console.log('vypisujem data teams po prerobeni dat', data)
    return data
  }

  async function getPatients(yearmonth) {
    console.log('vypisujem yearmonth', yearmonth)
    const data = await db.query(
      "SELECT t.id AS key, p.pat_from, p.pat_to, c.firstname, c.lastname from teams t LEFT JOIN patient p ON t.id=p.id_team LEFT JOIN clients c ON p.id_client=c.id ORDER BY t.id", []
    );
    return data;
  }

  async function addTeam(name) { //doriesit co sa bude vracat
    //console.log(diagnosis, diagnosis.length)
      const data = await db.query(
        'INSERT INTO teams(name, team_from) VALUES($1, CURRENT_TIMESTAMP) RETURNING id', [name]
      );
      return data
    }

  async function addMember(id_team, id_emp, mem_from, mem_to){ //adding nurse into the team
    const timecheck = await db.query(
      "SELECT * FROM member WHERE '[$1, $2]'::daterange @> emp_from AND '[$1, $2]'::daterange @> emp_to", [id_team, id_emp, mem_from, mem_to]
    );
      let data=null
    if(timecheck===[]){

    data = await db.query(
      'INSERT INTO member(id_team, id_employee, mem_from, mem_to) VALUES($1, $2, $3, $4) RETURNING id', [id_team, id_emp, mem_from, mem_to]
    );
    }
    return data
  }

  async function editMember(id, id_team, id_emp, mem_from, mem_to){ 
    const timecheck = await db.query(
      //"SELECT * FROM member WHERE '[$1, $2]'::daterange @> emp_from AND '[$1, $2]'::daterange @> emp_to WHERE id != $3", [id_team, id_emp, mem_from, mem_to, id]
      //"SELECT * FROM member WHERE (mem_from>=$1 AND mem_from=<$2) OR (mem_to>=$1 AND mem_to=<$2)"
      "SELECT * FROM member WHERE (mem_from::timestamp >= '2022-04-10'::date OR mem_from::timestamp<='2022-04-11'::date) OR (mem_to::timestamp>='2022-04-10'::date OR mem_to::timestamp<='2022-04-11'::date)", [id_team, id_emp, mem_from, mem_to, id]
      );
    console.log(timecheck)
      let data=null
    if(timecheck===[]){

    data = await db.query(
      'UPDATE member SET id_team=$1, id_employee=$2, mem_from=$3, mem_to=$4 VALUES($1, $2, $3, $4) WHERE id=$5', [id_team, id_emp, mem_from, mem_to, id]
    );
    }
    return data
  }

  async function addPatient(id_team, id_client, pat_from, pat_to){ //if
    const timecheck = await db.query(
      "SELECT * FROM patient WHERE '[$1, $2]'::daterange @> emp_from AND '[$1, $2]'::daterange @> emp_to", [id_team, id_emp, mem_from, mem_to]
    );
      let data=null
    if(timecheck===[]){

    data = await db.query(
      'INSERT INTO patient(id_team, id_employee, mem_from, mem_to) VALUES($1, $2, $3, $4) RETURNING id', [id_team, id_emp, mem_from, mem_to]
    );
    }
    return data
  }
  
  async function editPatient(id_team, id_client, pat_from, pat_to){ //if
    
  }
  // async function getClientsWithDiagnosis() {
  //   const data = await db.query(
  //     'SELECT id AS key, firstname, lastname, address FROM clients JOIN ', []
  //     );
  //     return data
  //   }

  async function newTeam(members, patients) { //doriesit co sa bude vracat
    console.log(diagnosis, diagnosis.length)
      const data = await db.query(
        'INSERT INTO teams(date_from) VALUES(CURRENT_TIMESTAMP) RETURNING id', []
      );
      // console.log(data, data[0].id)
      let data2 = null //prerobit na pole
      for (let i = 0; i < members.length; i++) {
      data2 = await db.query(
        'INSERT INTO member(id_employee, id_team) VALUES($1) RETURNING *', [members[i], data[0].id]
      );
      }

      let data3 = null //prerobit na pole
      for (let i = 0; i < patients.length; i++) {
        data3 = await db.query(
          'INSERT INTO patient(id_client, id_team) VALUES($1) RETURNING *', [patients[i], data[0].id]
        );
        }
      return data2
    }

    async function editTeam(id, members) { //doriesit co sa bude vracat
        console.log(diagnosis, diagnosis.length)
          const data = await db.query(
            'INSERT INTO clients(firstname, lastname, address) VALUES($1, $2, $3) RETURNING id', [firstname, lastname, address]
          );
          // console.log(data, data[0].id)
          let data2 = null
          for (let i = 0; i < diagnosis.length; i++) {
          data2 = await db.query(
            'INSERT INTO diagnosis_reports(id_diagnosis, id_client) VALUES($1, $2) RETURNING *', [diagnosis[i], data[0].id]
          );
          }
          return data2
        }

  module.exports = {
    //getTeams,
    getTeamMembers,
    getTeamPatients,
    getMembers,
    getPatients,
    addTeam,
    newTeam,
    editTeam
  }