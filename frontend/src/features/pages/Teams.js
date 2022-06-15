import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EdiTable } from '../components/EdiTable';
import { Organizer } from '../components/Organizer';
import { Organizer2 } from '../components/Organizer2';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
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
import { Card, Row, Col, Typography, Popconfirm, Calendar, Tag, Select, DatePicker} from 'antd';
import { Layout, Table, Breadcrumb, Button } from 'antd';
import moment from 'moment';
const { Content, Header, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;
//const firstrow = [{key:'0', firstname:'asd', lastname:'asd', address:'CERVENA', editable: true}]
// const datadata = [{key:'0', firstname:'Hana', lastname:'Zelena', address:'Lesna', team: 'KOVACOVA'},
// {key:'1', firstname:'Jan', lastname:'Biely', address:'Topolcany', team: 'HORVATOVA'},
// {key:'2', firstname:'Zuzana', lastname:'Mikusova', address:'Tovarniky', team: 'MOJZIS'},
// {key:'3', firstname:'Zdena', lastname:'Kovacova', address:'Topolcany', team: 'KOVACOVA'},
// {key:'4', firstname:'Rastislav', lastname:'Nepela', address:'Nemcice', team: 'KOVACOVA'},
// {key:'5', firstname:'Bozena', lastname:'Mojzisova', address:'Praznovce', team: 'HORVATOVA'},
// {key:'6', firstname:'Ondrej', lastname:'Horvat', address:'Nemcice', team: 'CERVENA'},
// {key:'70', firstname:'Iveta', lastname:'Kovacova', address:'Topolcany', team: 'GAJDOS'},
// ]

export function Teams() {
  const dispatch = useDispatch();
  //const [disabledadd, setDisabledadd] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('3');
  const [selectedYear, setSelectedYear] = useState('2022');
  const [selectedMonth, setSelectedMonth] = useState('4');
  const calendata = useSelector(selectCalendar);
  console.log('vypisujem calendata z databazky', calendata)
  console.log('vypisujem calendata length', calendata.length)
  let data=[]
  let key=0
  for(let i=0;i<calendata.length;i++){
    console.log('CACACA')
    for(let j=calendata[i].day_from;j<=calendata[i].day_to;j++){
      data.push({key: key, nurse: calendata[i].n_first+' '+calendata[i].n_last, client: calendata[i].c_first+' '+calendata[i].c_last, day: j})
      
      console.log('vypisujem data-i po prerobeni v calendata', data[key])
      key++
    }
  }
  console.log('vypisujem data z calendara', data)

  const onDateSelect = (date)=>{
    console.log('selecting date', date)
  }

  const calendartitle = () => {
    return(
      <Row justify="space-between" align="middle">
        <Col>
        
        {/* <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select> */}
    <Select defaultValue="All teams" style={{ width: 120, zIndex: 2 }} onChange={handleChange} >
                        <Option value="allteams">All teams</Option>
                        {teams.map((team, index) => (<Option value={index}>{team.name}</Option>))}
                        
                    </Select>
        </Col>

        <Col>
        <DatePicker onChange={onDateSelect} picker="month" />
        </Col>
      </Row>
    )
  }

    const teams = [{name: 'Team 1', care: [{nurse: 'Horvathova', client: 'Joe Smith'},
                                            {nurse: 'Cervena', client: 'Joe Smith'},
                                            {nurse: 'Kovacova', client: 'Joe Green'},
                                            {nurse: 'Bagarova', client: 'John Black'}]},

                    {name: 'Team 2', care: [{nurse: 'Godalova', client: 'Joe Smith'},
                                            {nurse: 'Majtanova', client: 'Joe Smith'},
                                            {nurse: 'Biela', client: 'Joe Green'},
                                            {nurse: 'Majesky', client: 'Jill Bayes'}]},

                    {name: 'Team 3', care: [{nurse: 'Bogdanova', client: 'Joe Smith'},
                                            {nurse: 'Bielik', client: 'Joe Green'},
                                            {nurse: 'Bagarova', client: 'John Black'},
                                            {nurse: 'asdasdasd', client: 'Jill Bayes'}]},
                ]

  function getListData(value) {
      let listData = data.filter(item => item.day===value.date());
      console.log('vypisujem listdata z calen funkcie', listData)
      console.log('vypisujem value.date', value.date())
      console.log('vypisujem value', value.format('YYYY-MM-DD'))
      // switch (value.date()) {
      //   case 15:
      //     listData = data.filter(item => item.day=='15'); break;
      //     case 19:
      //     listData = [
      //       { type: '#0b8a46', content: 'BAGAROVA' },
      //       { type: '#1637db', content: 'BIELIK' },
      //     ]; break;
      //     case 23:
      //     listData = [
      //       { type: '#0b8a46', content: 'MAJESKY' },
      //       { type: '#1637db', content: 'GAJDOS' },
      //       { type: '#5f43d9', content: 'BIELA' },
      //     ]; break;
      //   default:
      // }
      return listData || [];
      //return listData = data.filter(item => item.day===value.date()) || [];
    }
    
    function dateCellRender(value) {
      const listData = getListData(value);
      console.log('vypisujem listdata z datecell renderu', listData)
      return (
        <ul className="events" style={{position: 'relative', right: 30}}>
          {
            listData.map(item => (
              <li key={item.key} style={{listStyle: 'none'}}>
                <Tag color='green'>{item.nurse}</Tag><Tag color='blue'>{item.client}</Tag>
              </li>
            ))
          }
        </ul>
      );
    }

    function handleChange(value) {
        console.log(`selected ${value}`, 'vypisujem zmenu datumu');
      }

  useEffect(() => {
          dispatch(fetchCalendar({id_team: selectedTeam, year: selectedYear, month: selectedMonth}));
        },[dispatch]);

        useEffect(() => {
          //dispatch(fetchCalendar());
          console.log('vypisujem zmenu calendata')
        },[calendata]);

  return (
    <>
    <Layout className="layout" hasSider>
      <Navigation selectedkeys={['9']} openkeys={['sub3']} />  
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ padding: '20px 0' }}>
            <Breadcrumb.Item><a href="/dashboard">Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>Teams</Breadcrumb.Item>
          </Breadcrumb>

          {/* CONTENT */}

          <Row style={{width: '100%'}}>
            <Col style={{width: '100%'}}>
                <Card style={{width: '100%'}}>
                    
                    {/* <Calendar dateCellRender={dateCellRender} mode='month' defaultValue={moment('2022-04-25')} headerRender={calendartitle} style={{position: 'relative', bottom: 44,  zIndex: 1}}/> */}
                    {/* style={{listStyle: 'none'}} */}
                    {/* <Organizer style={{width: '100%'}}/> */}
                    <Organizer2 style={{width: '100%'}}/>
                </Card>
            </Col>
          </Row>

          {/* END OF CONTENT */}

        </Content>                 
        <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
      </Layout>
    </Layout>
  </>);
}