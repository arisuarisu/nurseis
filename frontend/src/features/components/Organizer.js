import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EdiTable } from '../components/EdiTable';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
// import Calendar from 'tui-calendar'; /* ES6 */
// import "tui-calendar/dist/tui-calendar.css";

// // If you use the default popups, use this.
// import 'tui-date-picker/dist/tui-date-picker.css';
// import 'tui-time-picker/dist/tui-time-picker.css';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import {
  fetchTeams,
  fetchTeamMembers,
  fetchCalendar,
  selectTmembers,
  selectLoading,
  selectCalendar,
  newTeam,
  addTeam,
  editTeam,
  deleteTeam
} from '../pages/teamsSlice';
import { Card, Row, Col, Typography, Popconfirm, Tag, Select, DatePicker} from 'antd';
import { Layout, Table, Breadcrumb, Button } from 'antd';
import moment from 'moment';
const { Content, Header, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

export function Organizer() {
  const dispatch = useDispatch();
  //const [disabledadd, setDisabledadd] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('3');
  const [selectedYear, setSelectedYear] = useState('2022');
  const [selectedMonth, setSelectedMonth] = useState('4');
  const calendata = useSelector(selectCalendar);
//   console.log('vypisujem calendata z databazky', calendata)
//   console.log('vypisujem calendata length', calendata.length)
  let data=[]
  let key=0
//   for(let i=0;i<calendata.length;i++){
//     console.log('CACACA')
//     for(let j=calendata[i].day_from;j<=calendata[i].day_to;j++){
//       data.push({key: key, nurse: calendata[i].n_first+' '+calendata[i].n_last, client: calendata[i].c_first+' '+calendata[i].c_last, day: j})
      
//       console.log('vypisujem data-i po prerobeni v calendata', data[key])
//       key++
//     }
//   }
//   console.log('vypisujem data z calendara', data)

  const onDateSelect = (date)=>{
    console.log('selecting date', date)
  }

//   const calendartitle = () => {
//     return(
//       <Row justify="space-between" align="middle">
//         <Col>
        
        {/* <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select> */}
//     <Select defaultValue="All teams" style={{ width: 120, zIndex: 2 }} onChange={handleChange} >
//                         <Option value="allteams">All teams</Option>
//                         {teams.map((team, index) => (<Option value={index}>{team.name}</Option>))}
                        
//                     </Select>
//         </Col>

//         <Col>
//         <DatePicker onChange={onDateSelect} picker="month" />
//         </Col>
//       </Row>
//     )
//   }

    // const teams = [{name: 'Team 1', care: [{nurse: 'Horvathova', client: 'Joe Smith'},
    //                                         {nurse: 'Cervena', client: 'Joe Smith'},
    //                                         {nurse: 'Kovacova', client: 'Joe Green'},
    //                                         {nurse: 'Bagarova', client: 'John Black'}]},

    //                 {name: 'Team 2', care: [{nurse: 'Godalova', client: 'Joe Smith'},
    //                                         {nurse: 'Majtanova', client: 'Joe Smith'},
    //                                         {nurse: 'Biela', client: 'Joe Green'},
    //                                         {nurse: 'Majesky', client: 'Jill Bayes'}]},

    //                 {name: 'Team 3', care: [{nurse: 'Bogdanova', client: 'Joe Smith'},
    //                                         {nurse: 'Bielik', client: 'Joe Green'},
    //                                         {nurse: 'Bagarova', client: 'John Black'},
    //                                         {nurse: 'asdasdasd', client: 'Jill Bayes'}]},
    //            ]

//   function getListData(value) {
//       let listData = data.filter(item => item.day===value.date());
//       console.log('vypisujem listdata z calen funkcie', listData)
//       console.log('vypisujem value.date', value.date())
//       console.log('vypisujem value', value.format('YYYY-MM-DD'))
//       // switch (value.date()) {
//       //   case 15:
//       //     listData = data.filter(item => item.day=='15'); break;
//       //     case 19:
//       //     listData = [
//       //       { type: '#0b8a46', content: 'BAGAROVA' },
//       //       { type: '#1637db', content: 'BIELIK' },
//       //     ]; break;
//       //     case 23:
//       //     listData = [
//       //       { type: '#0b8a46', content: 'MAJESKY' },
//       //       { type: '#1637db', content: 'GAJDOS' },
//       //       { type: '#5f43d9', content: 'BIELA' },
//       //     ]; break;
//       //   default:
//       // }
//       return listData || [];
//       //return listData = data.filter(item => item.day===value.date()) || [];
//     }
    
//     function dateCellRender(value) {
//       const listData = getListData(value);
//       console.log('vypisujem listdata z datecell renderu', listData)
//       return (
//         <ul className="events" style={{position: 'relative', right: 30}}>
//           {
//             listData.map(item => (
//               <li key={item.key} style={{listStyle: 'none'}}>
//                 <Tag color='green'>{item.nurse}</Tag><Tag color='blue'>{item.client}</Tag>
//               </li>
//             ))
//           }
//         </ul>
//       );
//     }

//     function handleChange(value) {
//         console.log(`selected ${value}`, 'vypisujem zmenu datumu');
//       }

  useEffect(() => {
          dispatch(fetchCalendar({id_team: selectedTeam, year: selectedYear, month: selectedMonth}));
        },[dispatch]);

        useEffect(() => {
          //dispatch(fetchCalendar());
          console.log('vypisujem zmenu calendata')
        },[calendata]);

        const handleclick = value =>{
            console.log('handlujem click', value.dateStr)
        }

  return (
    <FullCalendar
    plugins={[ dayGridPlugin ]}
    initialView="dayGridMonth"
    weekends={true}
    //editable={true}
  events={calendata
//       [
//     { title: ' Kovacova: Albert Hajnal', start: '2022-05-02', end: '2022-05-08' },
//     { title: ' Milatova: Otto Schwartz', start: '2022-05-06', end: '2022-05-06' }
//   ]
}
  style={{width: '100%'}}
   dateClick={handleclick}
  />
//     <Calendar
//     height="900px"
//     calendars={[
//       {
//         id: '0',
//         name: 'Private',
//         bgColor: '#9e5fff',
//         borderColor: '#9e5fff'
//       },
//       {
//         id: '1',
//         name: 'Company',
//         bgColor: '#00a9ff',
//         borderColor: '#00a9ff'
//       }
//     ]}
//     disableDblClick={true}
//     disableClick={false}
//     isReadOnly={false}
//     month={{
//       startDayOfWeek: 0
//     }}
//     schedules={[
//       {
//         id: '1',
//         calendarId: '0',
//         title: 'TOAST UI Calendar Study',
//         category: 'time',
//         dueDateClass: '',
//         start: today.toISOString(),
//         end: getDate('hours', today, 3, '+').toISOString()
//       },
//       {
//         id: '2',
//         calendarId: '0',
//         title: 'Practice',
//         category: 'milestone',
//         dueDateClass: '',
//         start: getDate('date', today, 1, '+').toISOString(),
//         end: getDate('date', today, 1, '+').toISOString(),
//         isReadOnly: true
//       },
//       {
//         id: '3',
//         calendarId: '0',
//         title: 'FE Workshop',
//         category: 'allday',
//         dueDateClass: '',
//         start: getDate('date', today, 2, '-').toISOString(),
//         end: getDate('date', today, 1, '-').toISOString(),
//         isReadOnly: true
//       },
//       {
//         id: '4',
//         calendarId: '0',
//         title: 'Report',
//         category: 'time',
//         dueDateClass: '',
//         start: today.toISOString(),
//         end: getDate('hours', today, 1, '+').toISOString()
//       }
//     ]}
//     scheduleView
//     taskView
//     template={{
//       milestone(schedule) {
//         return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
//           schedule.title
//         }</span>`;
//       },
//       milestoneTitle() {
//         return 'Milestone';
//       },
//       allday(schedule) {
//         return `${schedule.title}<i class="fa fa-refresh"></i>`;
//       },
//       alldayTitle() {
//         return 'All Day';
//       }
//     }}
//     theme={myTheme}
//     timezones={[
//       {
//         timezoneOffset: 540,
//         displayLabel: 'GMT+09:00',
//         tooltip: 'Seoul'
//       },
//       {
//         timezoneOffset: -420,
//         displayLabel: 'GMT-08:00',
//         tooltip: 'Los Angeles'
//       }
//     ]}
//     useDetailPopup
//     useCreationPopup
//     view={selectedView} // You can also set the `defaultView` option.
//     week={{
//       showTimezoneCollapseButton: true,
//       timezonesCollapsed: true
//     }}
//   />
  )
}