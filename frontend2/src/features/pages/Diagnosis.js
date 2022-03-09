import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EdiTable } from '../components/EdiTable';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
import {
  fetchClients,
  selectClients
} from './clientsSlice';
 import { Card, Row, Col, Typography, Popconfirm} from 'antd';
import { Layout, Table, Breadcrumb, Button } from 'antd';
const { Content, Header, Footer } = Layout;
 const { Title } = Typography;
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

export function Diagnosis() {
  const dispatch = useDispatch();
  const [disabledadd, setDisabledadd] = useState(false);
  const clientslistredux = useSelector(selectClients);
  let clientslist = clientslistredux.map(item => ({ ...item }))
  //console.log(clientslist, "vypisujem clientslist")
  const clientslist2 = firstrow.concat(clientslist);
  //console.log(clientslist2, "vypisujem clientslist2")
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
  };

  const titlebutton = () => {
    return(
      <Row justify="space-between">
        <Col>Clients</Col>
        <Col>
          <Button type="primary" onClick={addnew} disabled={disabledadd}>Add patient</Button>
        </Col>
      </Row>
    )
  }

  const addnew = () => {
    setDisabledadd(true);
  }

  useEffect(() => {
          dispatch(fetchClients());
        },[dispatch]);

  return (
    <>
    <Layout className="layout" hasSider>
      <Navigation selectedkeys={['11']} openkeys={['']} />  
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ padding: '20px 0' }}>
            <Breadcrumb.Item><a href="/dashboard">Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>Diagnosis</Breadcrumb.Item>
          </Breadcrumb>

          {/* CONTENT */}

          {/* <Row>
            <EdiTable data={clientslist} title={titlebutton}/>
          </Row> */}

          {/* END OF CONTENT */}

        </Content>                 
        <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
      </Layout>
    </Layout>
  </>);
}