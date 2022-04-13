import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EdiTable } from '../components/EdiTable';
import { EdiTable2 } from '../components/EdiTable2';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
import { Clock } from '../components/Clock';
import {
  writeArrival,
  writeDeparture,
  getLast,
  selectLast
} from './attendanceSlice';
import {
  fetchClients,
  selectClients,
  selectLoading
} from '../pages/clientsSlice';
import moment from 'moment';
 import { Card, Row, Col, Typography, Popconfirm} from 'antd';
import { Layout, Table, Breadcrumb, Button, DatePicker, Select } from 'antd';
const { RangePicker } = DatePicker;
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

export function MyAttendance() {
  const dispatch = useDispatch();
  const [disabledadd, setDisabledadd] = useState(false);
  const [reason, setReason] = useState('domov');
  const [clients, setclients] = useState(useSelector(selectClients));
  // const [arr, setArr] = useState('');
  // const [dep, setDep] = useState('');
  //const [lastAction, setLastaction] = useState('');
  //const clientslistredux = useSelector(selectClients);
  //let clientslist = clientslistredux.map(item => ({ ...item }))
  //console.log(clientslist, "vypisujem clientslist")
  //const clientslist2 = firstrow.concat(clientslist);
  //console.log(clientslist2, "vypisujem clientslist2")
  const last = useSelector(selectLast);

  // useEffect(() => {
  //   dispatch(fetchClients())
  //   //setInterval(dispatch(fetchClients()), 1000)
  //       },[]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const titlebutton = () => {
    return(
      <Row justify="space-between">
        <Col>Attendance</Col>
        <Col>
            <DatePicker onChange={onChange} />
            </Col>
      </Row>
    )
  }

  function handleChange(value) {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    setReason(value);
  }

  const addnew = () => {
    setDisabledadd(true);
  }

  useEffect(() => {
          dispatch(getLast());
        },[dispatch]);

  return (
    <>
    <Layout className="layout" hasSider>
      <Navigation selectedkeys={['12']} openkeys={['sub4']} />  
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ padding: '20px 0' }}>
            <Breadcrumb.Item><a href="/dashboard">Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>My attendance</Breadcrumb.Item>
          </Breadcrumb>

          {/* CONTENT */}

          <Row>
            <Clock />
            Tu si spravte dochadzku
            {last==='odchod' || last==='nepritomnost' ? <>
            <Button type="primary" onClick={() => {dispatch(writeArrival({datetime: Date.now()}))}}>Prichod</Button>
            <Button type="primary" disabled>Odchod</Button>
            <Select defaultValue="domov" style={{ width: 120 }} allowClear disabled>
              <Option value="domov">Odchod</Option>
              <Option value="obed">Obed</Option>
            </Select>
            </> :
            <>
            <Button type="primary" disabled>Prichod</Button>
            <Button type="primary" onClick={() => {dispatch(writeDeparture({datetime: Date.now(), reason: reason}))}}>Odchod</Button>
            <Select defaultValue="domov" style={{ width: 120 }} onChange={handleChange} allowClear>
              <Option value="domov">Odchod</Option>
              <Option value="obed">Obed</Option>
            </Select>
            </>
            }
          {/* <EdiTable2 type='clients'/> */}
          </Row>

          {/* END OF CONTENT */}

        </Content>                 
        <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
      </Layout>
    </Layout>
  </>);
}