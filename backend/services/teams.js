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

  async function getTeamMembers(year, month) { //vybrat id timov s id a menami nursiek
    //const yearmonth='2022-04'
    //console.log('vypisujem pred getteams')
    const data = await db.query(
      //"SELECT t.id, STRING_AGG (employees.firstname ',') members FROM teams t INNER JOIN member m ON t.id=m.id_team INNER JOIN employees e ON m.id_employee=e.id GROUP BY t.id", []
      //"SELECT t.id as table, ROW_NUMBER () OVER (ORDER BY t.id) AS key, STRING_AGG (e.firstname || ' ' ||e.lastname, ',') members, STRING_AGG (e.id::varchar(255), ',') member_ids FROM teams t LEFT JOIN member m ON t.id=m.id_team LEFT JOIN employees e ON m.id_employee=e.id WHERE e.role='nurse' GROUP BY t.id ORDER BY t.id", []
    "select id_team as key, STRING_AGG(name, ',') members, STRING_AGG(id_nurse::varchar(255), ',') member_ids from (SELECT distinct(concat(c.firstname, ' ', c.lastname)) as name, id as id_team, id_nurse from (select t.id, ROW_NUMBER () OVER (ORDER BY t.id) AS key, e.id as id_nurse, e.firstname, e.lastname, m.mem_from, m.mem_to from teams t left join (select * from member WHERE ($1<= EXTRACT(YEAR FROM mem_from) AND $2<= EXTRACT(MONTH FROM mem_from)) OR ($3>= EXTRACT(YEAR FROM mem_to) AND $4>= EXTRACT(MONTH FROM mem_to))) as m on t.id=m.id_team left join employees e on m.id_employee=e.id GROUP BY t.id, e.id, e.firstname, e.lastname, m.mem_from, m.mem_to) as c order by id)as q GROUP BY q.id_team", [year, month, year, month]
    );
    //select id_team as key, STRING_AGG(name, ',') members, STRING_AGG(id_nurse::varchar(255), ',') member_ids from (SELECT distinct(concat(c.firstname, ' ', c.lastname)) as name, id as id_team, id_nurse from (select t.id, ROW_NUMBER () OVER (ORDER BY t.id) AS key, e.id as id_nurse, e.firstname, e.lastname, m.mem_from, m.mem_to from teams t left join member m on t.id=m.id_team left join employees e on m.id_employee=e.id WHERE (EXTRACT(YEAR FROM TIMESTAMP '2022-04-11')<= EXTRACT(YEAR FROM m.mem_from) AND EXTRACT(MONTH FROM TIMESTAMP '2022-04-11')<= EXTRACT(MONTH FROM m.mem_from)) OR (EXTRACT(YEAR FROM TIMESTAMP '2022-04-11')>= EXTRACT(YEAR FROM m.mem_to) AND EXTRACT(MONTH FROM TIMESTAMP '2022-04-11')>= EXTRACT(MONTH FROM m.mem_to)) GROUP BY t.id, e.id, e.firstname, e.lastname, m.mem_from, m.mem_to) as c order by id)as q GROUP BY q.id_team
    //select t.id, ROW_NUMBER () OVER (ORDER BY t.id) AS key, e.id as id_nurse, e.firstname, e.lastname, m.mem_from, m.mem_to from teams t left join (select * from member (EXTRACT(YEAR FROM TIMESTAMP '2022-04-11')<= EXTRACT(YEAR FROM m.mem_from) AND EXTRACT(MONTH FROM TIMESTAMP '2022-04-11')<= EXTRACT(MONTH FROM m.mem_from)) OR (EXTRACT(YEAR FROM TIMESTAMP '2022-04-11')>= EXTRACT(YEAR FROM m.mem_to) AND EXTRACT(MONTH FROM TIMESTAMP '2022-04-11')>= EXTRACT(MONTH FROM m.mem_to))) m on t.id=m.id_team left join employees e on m.id_employee=e.id GROUP BY t.id, e.id, e.firstname, e.lastname, m.mem_from, m.mem_to
    console.log('vypisujem data teams ', data)
    let arr=null
    let arr2=null
    for (let i = 0; i < data.length; i++) {
      if(data[i].members!==null){
        if(data[i].members===' '){
          data[i].members=[]
          //continue //?
        }else{
          arr = data[i].members.split(',');
        data[i].members=[...arr]
        }
        //arr = data[i].members.split(',');
        //data[i].members=[...arr]
        // arr2 = data[i].member_ids.split(',');
        // data[i].member_ids=[...arr2]
      }else{
        data[i].members=[]
        //data[i].member_ids=[]
      }
      if(data[i].member_ids!==null){
        arr2 = data[i].member_ids.split(',');
        data[i].member_ids=[...arr2]
      }else{
        //data[i].members=[]
        data[i].member_ids=[]
      }

    }
    console.log('vypisujem data teams po prerobeni dat', data)
    return data
  }

  async function getMembers(year, month) {
    console.log('vypisujem yearmonth v getmembers', year, month)
    const data = await db.query(
      "SELECT t.id AS table, ROW_NUMBER () OVER (ORDER BY t.id) AS key, m.mem_from, m.mem_to, e.firstname, e.lastname from teams t LEFT JOIN member m ON t.id=m.id_team LEFT JOIN employees e ON m.id_employee=e.id WHERE role='nurse' AND ($1<= EXTRACT(YEAR FROM mem_from) AND $2<= EXTRACT(MONTH FROM mem_from)) OR ($3>= EXTRACT(YEAR FROM mem_to) AND $4>= EXTRACT(MONTH FROM mem_to)) ORDER BY t.id", [year, month, year, month]
    );
    for(let i=0; i<data.length;i++){
      if(data[i].mem_to===null){
        data[i].mem_to='';
      }
    }
    console.log('vypisujem getmembers:', data)
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

  async function getTeamCalendar(id_team, year, month) {
    //console.log('vypisujem yearmonth', year, month)
    const data = await db.query(
      "select ROW_NUMBER () OVER (ORDER BY t.id) AS key, e.firstname as n_first, e.lastname as n_last, c.firstname as c_first, c.lastname as c_last, EXTRACT(MONTH FROM p.pat_from) as month_from, EXTRACT(DAY FROM p.pat_from) as day_from, EXTRACT(MONTH FROM p.pat_to) as month_to, EXTRACT(DAY FROM p.pat_to) as day_to from teams t left join member m on t.id=m.id_team left join employees e on m.id_employee=e.id left join patient p on e.id=p.id_nurse left join clients c on p.id_client=c.id WHERE e.role='nurse' AND t.id=$1 AND (($2>= EXTRACT(YEAR FROM pat_from) AND $3>= EXTRACT(MONTH FROM pat_from)) AND (($4<= EXTRACT(YEAR FROM pat_to) AND $5<= EXTRACT(MONTH FROM pat_to)) OR pat_to=NULL))", [id_team, year, month, year, month]
    );
    //let newdata=[]
    for(let i;i<data.length;i++){
      if(data[i].month_from<month){
        data[i].day_from=1
        data[i].month_from=month
      }
      if(data[i].month_to>month){
        //najst posledny den v danom mesiaci

        data[i].day_to=new Date(year, month, 0).getDate(); //returns last day in month
        data[i].month_to=month
      }
    }
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

        async function deleteTeam(id) { //doriesit co sa bude vracat
          //console.log(diagnosis, diagnosis.length)
            const data = await db.query(
              'DELETE FROM teams WHERE id=$1', [id]
            );
            // console.log(data, data[0].id)
            const data2 = await db.query(
              'DELETE FROM member WHERE id_team=$1', [id]
            );
            //}
            return data2
          }

  module.exports = {
    //getTeams,
    getTeamMembers,
    getTeamPatients,
    getMembers,
    getPatients,
    getTeamCalendar,
    addTeam,
    newTeam,
    editTeam,
    deleteTeam
  }