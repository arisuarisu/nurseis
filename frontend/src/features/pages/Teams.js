import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EdiTable } from '../components/EdiTable';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
import {
  fetchClients,
  selectClients
} from './clientsSlice';
import { Card, Row, Col, Typography, Popconfirm, Calendar, Tag, Select} from 'antd';
import { Layout, Table, Breadcrumb, Button } from 'antd';
const { Content, Header, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;
const firstrow = [{key:'0', firstname:'asd', lastname:'asd', address:'CERVENA', editable: true}]
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
  const [chosenteam, setChosenteam] = useState(false);
  //const clientslistredux = useSelector(selectClients);
 // let clientslist = clientslistredux.map(item => ({ ...item }))
  //console.log(clientslist, "vypisujem clientslist")
  //const clientslist2 = firstrow.concat(clientslist);
  //console.log(clientslist2, "vypisujem clientslist2")

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
      let listData;
      switch (value.date()) {
        case 15:
          listData = [
            { type: '#0b8a46', content: 'KOVACOVA' },
            { type: '#1637db', content: 'HORVATHOVA' },
            { type: '#5f43d9', content: 'GAJDOS' },
          ]; break;
          case 19:
          listData = [
            { type: '#0b8a46', content: 'BAGAROVA' },
            { type: '#1637db', content: 'BIELIK' },
          ]; break;
          case 23:
          listData = [
            { type: '#0b8a46', content: 'MAJESKY' },
            { type: '#1637db', content: 'GAJDOS' },
            { type: '#5f43d9', content: 'BIELA' },
          ]; break;
        default:
      }
      return listData || [];
    }
    
    function dateCellRender(value) {
      const listData = getListData(value);
      return (
        <ul className="events" style={{position: 'relative', right: 30}}>
          {
            listData.map(item => (
              <li key={item.content} style={{listStyle: 'none'}}>
                <Tag color={item.type}>{item.content}</Tag>
              </li>
            ))
          }
        </ul>
      );
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
      }

//   useEffect(() => {
//           dispatch(fetchClients());
//         },[dispatch]);

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

          <Row>
            <Col>
                <Card>
                    <Select defaultValue="All teams" style={{ width: 120 }} onChange={handleChange} style={{  zIndex: 2}}>
                        <Option value="allteams">All teams</Option>
                        {teams.map((team, index) => (<Option value={index}>{team.name}</Option>))}
                        
                    </Select>
                    <Calendar dateCellRender={dateCellRender}  style={{position: 'relative', bottom: 44,  zIndex: 1}}/>
                    {/* style={{listStyle: 'none'}} */}
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