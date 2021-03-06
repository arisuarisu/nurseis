import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { EdiTable } from '../components/EdiTable';
// import { EdiTable2 } from '../components/EdiTable2';
import { EditableClients } from '../components/EditableClients';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
import {
  fetchClients,
  selectClients,
  selectLoading
} from './clientsSlice';
 import { Card, Row, Col, Typography, Popconfirm, Spin} from 'antd';
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

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
// };

export function Clients() {
  //const dispatch = useDispatch();
  // const [newclient, setNewclient] = useState(false);
  //const clientslistredux = useSelector(selectClients);
  //let clientslist = clientslistredux.map(item => ({ ...item }))
  // const loading = useSelector(selectLoading);
  //const [rerender, setRerender] = useState(false)
  //console.log(clientslist, "vypisujem clientslist")
  //const clientslist2 = firstrow.concat(clientslist);
  //console.log(clientslist2, "vypisujem clientslist2")
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: record => ({
  //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //   }),
  // };

  // const titlebutton = () => {
  //   return(
  //     <Row justify="space-between">
  //       <Col>Clients</Col>
  //       <Col>
  //         <Button type="primary" onClick={addnew} disabled={newclient}>Add client</Button>
  //       </Col>
  //     </Row>
  //   )
  // }

  // const rerendering = () => {
  //   setRerender(!rerender);
  // }

  // const addnew = () => {
  //   setNewclient(true);
  // }

  // const cancelnew = () => {
  //   setNewclient(false);
  // }

  // useEffect(() => {
  //   //setTimeout(() => {dispatch(fetchClients())}, 1000);
  //   dispatch(fetchClients())
  //       },[dispatch]);

  return (
    <>
    <Layout className="layout" hasSider>
      <Navigation selectedkeys={['2']} openkeys={['sub1']} />  
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ padding: '20px 0' }}>
            <Breadcrumb.Item><a href="/dashboard">Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>Clients</Breadcrumb.Item>
          </Breadcrumb>

          {/* CONTENT */}

          <Row>
            <EditableClients />
            {/* <EdiTable2 data={clientslistredux} title={titlebutton} loading={loading} new={newclient} cancelnew={cancelnew} type='clients' rerender={rerendering}/> */}
          </Row>

          {/* END OF CONTENT */}

        </Content>                 
        <Footer style={{ textAlign: 'center' }}>NurseIS ??2022</Footer>
      </Layout>
    </Layout>
  </>);
}