import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EdiTable } from '../components/EdiTable';
import { EdiTable2 } from '../components/EdiTable2';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
import { Clock } from '../components/Clock';
import {
  getAtt,
  writeArrival,
  writeDeparture,
  getLast,
  selectLast,
  selectAttendance
} from './attendanceSlice';
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

export function Attendance() {
  const dispatch = useDispatch();
  const [disabledadd, setDisabledadd] = useState(false);
  const [reason, setReason] = useState('domov');
  // const [arr, setArr] = useState('');
  // const [dep, setDep] = useState('');
  //const [lastAction, setLastaction] = useState('');
  //const clientslistredux = useSelector(selectClients);
  //let clientslist = clientslistredux.map(item => ({ ...item }))
  //console.log(clientslist, "vypisujem clientslist")
  //const clientslist2 = firstrow.concat(clientslist);
  //console.log(clientslist2, "vypisujem clientslist2")
  const last = useSelector(selectLast);
  const attendance = useSelector(selectAttendance);
  console.log('vypisujem attendance objekt zo selectu', attendance)

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
  };

  const attendancelist = [{key: '1', firstname: 'Zuzana', lastname: 'Kovacova', arrival: '7:59:48', lunch_from: '12:00:01', lunch_to: '12:25:14', departure:  '16:03:00', holiday: false, sickleave: false},
                        {key: '2', firstname: 'Natalia', lastname: 'Cervena', arrival: '7:50:32', lunch_from: '12:00:00', lunch_to:  '12:29:51', departure:  '16:01:00', holiday: false, sickleave: false},
                        {key: '3', firstname: 'Pavol', lastname: 'Majesky', arrival: '7:59:59', lunch_from: '11:30:00', lunch_to:  '11:59:21', departure:  '15:59:59', holiday: false, sickleave: false},
                        {key: '4', firstname: 'Beata', lastname: 'Horvatova', arrival: '7:58:40', lunch_from: '12:02:12', lunch_to:  '12:31:54', departure:  '16:12:03', holiday: false, sickleave: false},
                        {key: '5', firstname: 'Lucia', lastname: 'Biela', arrival: '7:52:33', lunch_from: '12:03:06', lunch_to:  '12:32:01', departure:  '16:05:07', holiday: false, sickleave: false},
                        {key: '6', firstname: 'Lukas', lastname: 'Bielik', arrival: '7:57:21', lunch_from: '11:58:56', lunch_to:  '12:27:35', departure:  '16:20:36', holiday: false, sickleave: false},
]

function onChange(date, dateString) {
  //console.log(date, dateString);
  dispatch(getAtt({date: dateString}));
  console.log(dateString, 'vypisujem datestring z attendance komponentu')
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
      <Navigation selectedkeys={['10']} openkeys={['sub4']} />  
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ padding: '20px 0' }}>
            <Breadcrumb.Item><a href="/dashboard">Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>Attendance</Breadcrumb.Item>
          </Breadcrumb>

          {/* CONTENT */}

          <Row>
            <EdiTable data={attendancelist} title={titlebutton} type='attendance' />
          </Row>

          {/* END OF CONTENT */}

        </Content>                 
        <Footer style={{ textAlign: 'center' }}>NurseIS ??2022</Footer>
      </Layout>
    </Layout>
  </>);
}