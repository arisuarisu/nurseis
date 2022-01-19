//import React, { useEffect } from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { Datatable } from '../components/Datatable';
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
// import { Card, Col, Row,} from 'antd';
import { Layout, Table, Breadcrumb } from 'antd';
const { Content, Header, Footer } = Layout;
// const { Title } = Typography;
// const { Meta } = Card;

export function Clients() {
  const dispatch = useDispatch();
  const clientslist = useSelector(selectClients);

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
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
          //dispatch(fetchClients());
          // dispatch(setSelectedKeys(['13']));
          // dispatch(setOpenKeys(['sub0']));
        },[]);

  return (
    <>
    {/* <Datable data={clientslist} /> */}
    <Layout className="layout" hasSider>
                
                <Navigation selectedkeys={['13']} openkeys={['sub0']} />  
                
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
                <Content style={{ padding: '0 50px' }}>

                <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="/clients">Clients</a>
    </Breadcrumb.Item>
    </Breadcrumb>

    <Table rowSelection={rowSelection} columns={columns} dataSource={clientslist} />

    </Content>                 
                 <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
                 </Layout>
                 </Layout>
    </>);
}