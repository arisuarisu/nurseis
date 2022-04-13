import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { EdiTable } from '../components/EdiTable';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
import {
  fetchEmployees,
  searchEmployees,
  newEmployee,
  selectEmployees,
  selectSearchEmployees,
  editEmployee,
  deleteEmployee
} from './employeesSlice';
 import { Card, Row, Col, Typography, Popconfirm} from 'antd';
import { Layout, Table, Breadcrumb, Button, Tabs,  Form, Input } from 'antd';
const { Search } = Input;
const { Content, Header, Footer } = Layout;
 const { Title } = Typography;
 const { TabPane } = Tabs;
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

export function Editnurse() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const searchlist = useSelector(selectSearchEmployees);

  //const Demo = () => {
    const onFinish = (values) => {
      console.log('Success:', values);
      dispatch(newEmployee({firstname: values.firstname, lastname: values.lastname}))
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const search = ()=>{
      dispatch(searchEmployees({lastname: searchValue}))
    }

  return (
    <>
    <Layout className="layout" hasSider>
      <Navigation selectedkeys={['7']} openkeys={['sub2']} />  
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ padding: '20px 0' }}>
            <Breadcrumb.Item><a href="/dashboard">Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>Edit nurse</Breadcrumb.Item>
          </Breadcrumb>

          {/* CONTENT */}

          <div className="card-container">
    <Tabs type="card">
      <TabPane tab="New nurse" key="1">
        <Row>
          <Col>
        <Card style={{width: '100%'}}>
        <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Firstname"
        name="firstname"
        rules={[
          {
            required: true,
            message: 'Please input your firstname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lastname"
        name="lastname"
        rules={[
          {
            required: true,
            message: 'Please input your lastname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </Card>
        </Col>
        </Row>
      </TabPane>
      <TabPane tab="Edit nurse" key="2">
      <Search placeholder="Find new friends here" value={searchValue} size="large" onChange={(e) => {setSearchValue(e.target.value)}} style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', paddingBottom: '15px'}} onSearch={search} enterButton />
  {//showSearch || requestedlist && catfriendslist ?
  searchValue!=='' ?
    <>{searchlist.map((item) => (
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card hoverable key={item.id} bordered={true} 
                //   cover={
                // <img alt={item.nickname} src={url + item.img + png} />}
                >
            <p>{item.firstname}</p>
            <p>{item.lastname}</p>
        </Card>
    </Col> ))}</>:<></>}
      </TabPane>
    </Tabs>
  </div>,

          {/* END OF CONTENT */}

        </Content>                 
        <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
      </Layout>
    </Layout>
  </>);
}