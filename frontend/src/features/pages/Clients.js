//import React, { useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EdiTable } from '../components/EdiTable';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
import {
  fetchClients,
  selectClients
} from './clientsSlice';
import {
  setSelectedKeys,
  setOpenKeys
} from '../layout/menuSlice';
 import { Card, Row, Typography} from 'antd';
import { Layout, Table, Breadcrumb, Button } from 'antd';
const { Content, Header, Footer } = Layout;
 const { Title } = Typography;
// const { Meta } = Card;
const firstrow = [{key:'0', firstname:'asd', lastname:'asd', address:'CERVENA', editable: true}]
const datadata = [{key:'0', firstname:'Hana', lastname:'Zelena', address:'Lesna', team: 'KOVACOVA'},
{key:'1', firstname:'Jan', lastname:'Biely', address:'Topolcany', team: 'HORVATOVA'},
{key:'2', firstname:'Zuzana', lastname:'Mikusova', address:'Tovarniky', team: 'MOJZIS'},
{key:'3', firstname:'Zdena', lastname:'Kovacova', address:'Topolcany', team: 'KOVACOVA'},
{key:'4', firstname:'Rastislav', lastname:'Nepela', address:'Nemcice', team: 'KOVACOVA'},
{key:'5', firstname:'Bozena', lastname:'Mojzisova', address:'Praznovce', team: 'HORVATOVA'},
{key:'6', firstname:'Ondrej', lastname:'Horvat', address:'Nemcice', team: 'CERVENA'},
{key:'70', firstname:'Iveta', lastname:'Kovacova', address:'Topolcany', team: 'GAJDOS'},
]

export function Clients() {
  const dispatch = useDispatch();
  const clientslistredux = useSelector(selectClients);
  const clientslist = clientslistredux.map(item => ({ ...item }))
  console.log(clientslist, "vypisujem clientslist")
  const clientslist2 = firstrow.concat(clientslist);
  const columns = [{
    title: 'Firstame',
    dataIndex: 'firstname',
    // render: text => <a href="#">{text}</a>,
  }, {
    title: 'Lastname',
    dataIndex: 'lastname',
  }, {
    title: 'Address',
    dataIndex: 'address',
    // render: () => (<Button />)
  }
  , {
    title: 'Team',
    dataIndex: 'team',
    // render: () => (<Button />)
  }];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
  };

  useEffect(() => {
          dispatch(fetchClients());
          // dispatch(setSelectedKeys(['13']));
          // dispatch(setOpenKeys(['sub0']));
        },[dispatch]);

  return (
    <>
    {/* <Datable data={clientslist} /> */}
    <Layout className="layout" hasSider>
                
                <Navigation selectedkeys={['2']} openkeys={['sub1']} />  
                
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
                <Content style={{ padding: '0 50px' }}>

                <Breadcrumb style={{ padding: '20px 0' }}>
    <Breadcrumb.Item><a href="/dashboard">Home</a></Breadcrumb.Item>
    <Breadcrumb.Item>
      Clients
    </Breadcrumb.Item>
    </Breadcrumb>
<Row>
    {/* <Card style={{height: '100%'}} bordered={true} >
                  <Title level={5}>asdasd</Title>
                  <p>asdas</p>
                  <p><b>PRICE:</b> asdasd</p>
                  <p><b>PIECES:</b> asdasd</p>
                  
              </Card> */}
</Row>
<Row>
    {/* <Table rowSelection={rowSelection} columns={columns} dataSource={clientslist2} /> */}
    {/* <Table rowSelection={rowSelection} columns={columns} dataSource={datadata} /> */}
    <EdiTable columns={columns} data={clientslist2}/>
</Row>
    </Content>                 
                 <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
                 </Layout>
                 </Layout>
    </>);
}