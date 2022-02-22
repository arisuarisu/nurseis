import React, { useEffect } from 'react';
import { Link } from  "react-router-dom";
import { Breadcrumb, Layout, Calendar, Typography, Tag, Card, Row, Col, List, Avatar } from 'antd';
import { UserOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
  ForkOutlined,
CalendarOutlined,
UserTwoTone,
  UserAddTwoTone,
  UsergroupAddTwoTone,
  SolutionTwoTone,
  ForkTwoTone,
CalendarFilled } from '@ant-design/icons';
//import { useDispatch } from 'react-redux';
// import { Redirect, NavLink } from "react-router-dom";
// import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
import {
  setSelectedKeys,
  setOpenKeys
  } from '../layout/menuSlice';
  const { Content, Header, Footer } = Layout;

  const { Meta } = Card;
const { Title, Text } = Typography;

export function Dashboard() {

  const data=[{id: 1, name: 'alice', email: 'asdasd'},
  {id: 2, name: 'alicasdasde', email: 'asdasd'},
  {id: 3, name: 'alicasdasde', email: 'asdasd'},
  {id: 4, name: 'alicasdasde', email: 'asdasd'},
  {id: 5, name: 'alicasdasde', email: 'asdasd'},
  {id: 6, name: 'alicasdasde', email: 'asdasd'},
  {id: 7, name: 'aliasdce', email: 'asdasd'}]

  const data2=[{id: 1, name: 'alice', email: 'asdasd'},
  {id: 7, name: 'aliasdce', email: 'asdasd'}]

  const data3=[{id: 1, name: 'alice', email: 'asdasd'}]
    // const dispatch = useDispatch();
    // const active = useSelector(selectActive);
    // const catfriends = useSelector(selectCatfriends);
    // let {jwtPayload} = useSessionContext();
    // let role = jwtPayload.role;

    
    // function getListData(value) {
    //   let listData;
    //   switch (value.date()) {
    //     case 15:
    //       listData = [
    //         { type: '#0b8a46', content: 'KOVACOVA' },
    //         { type: '#1637db', content: 'HORVATHOVA' },
    //         { type: '#5f43d9', content: 'Gajdos' },
    //       ]; break;
    //     default:
    //   }
    //   return listData || [];
    // }
    
    // function dateCellRender(value) {
    //   const listData = getListData(value);
    //   return (
    //     <ul className="events">
    //       {
    //         listData.map(item => (
    //           <li key={item.content}>
    //             <Tag color={item.type}>{item.content}</Tag>
    //           </li>
    //         ))
    //       }
    //     </ul>
    //   );
    // }

            return (
              <>

              <Layout className="layout" hasSider>
                
                <Navigation selectedkeys={['1']} openkeys={['']} />  
                
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
                <Content style={{ padding: '0 50px' }}>

                <Breadcrumb style={{ padding: '20px 0' }}>
    <Breadcrumb.Item><a href="/dashboard">Home</a></Breadcrumb.Item>
    <Breadcrumb.Item>
      Dashboard
    </Breadcrumb.Item>
    
  </Breadcrumb>
  {/* <LayoutUpLeft /> */}

  {/* <Calendar dateCellRender={dateCellRender}  onPanelChange={console.log('panel changed')} />  */}

  <Card style={{width: '100%'}}>
  <Title level={2} style={{marginLeft: '10px'}}>Welcome to the Nurse information system!</Title>
  {/* <Text>Lorem ipsum lorem ipsum...</Text> */}
  <Row gutter={[24, 24]} style={{paddingTop: 15, paddingBottom: 15}}><Col>
  <Link to="/attendance"><Card style={{width: 150, border: 'none', textAlign: 'center'}} cover={<Avatar size={150} shape="square" icon={<CalendarOutlined />} />} >
    {/* <Meta title="Add patient" /> */}
    Attendance
  </Card></Link>
  </Col>
  <Col>
  <Link to="/clients"><Card style={{width: 150, border: 'none', textAlign: 'center'}} cover={<Avatar size={150} shape="square" icon={<UserAddOutlined />} />} >
    {/* <Meta title="Add patient" /> */}
    Add client
  </Card></Link>
  </Col>
  <Col>
  <Link to="/nurses"><Card style={{width: 150, border: 'none', textAlign: 'center'}} cover={<Avatar size={150} shape="square" icon={<ForkOutlined />} />} >
    {/* <Meta title="Add patient" /> */}
    Add nurse
  </Card></Link>
  </Col>
  <Col>
  <Link to="/teams"><Card style={{width: 150, border: 'none', textAlign: 'center'}} cover={<Avatar size={150} shape="square" icon={<UsergroupAddOutlined />} />} >
    {/* <Meta title="Add patient" /> */}
    Add team
  </Card></Link>
  </Col>
  <Col>
  <Link to="/teams"><Card style={{width: 150, border: 'none', textAlign: 'center'}} cover={<Avatar size={150} shape="square" icon={<SolutionOutlined />} />} >
    {/* <Meta title="Add patient" /> */}
    Team calendar
  </Card></Link>
  </Col>
  </Row>

    <Row gutter={[24, 24]} style={{paddingTop: 15, paddingBottom: 15}}>
      <Col xs={24} sm={24} md={12} lg={8}>
      <Title level={5} style={{textAlign: 'center'}}>Sick leave requests</Title>
        <Card style={{width: '100%'}}>
        
        <List
        style={{
          height: 250,
          width: '100%',
          overflow: 'auto',
          padding: '0 16px',
          //border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar
                  style={{
                    backgroundColor: '#87d068',
                  }}
                  icon={<UserOutlined />}
                />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
        </Card>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
      <Title level={5} style={{textAlign: 'center'}}>Sickness confirmation</Title>
        <Card style={{width: '100%'}}>
        
        <List
        style={{
          height: 250,
          width: '100%',
          overflow: 'auto',
          padding: '0 16px',
          //border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
          dataSource={data2}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar
                  style={{
                    backgroundColor: '#87d068',
                  }}
                  icon={<UserOutlined />}
                />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
        </Card>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
      <Title level={5} style={{textAlign: 'center'}}>Data edit requests</Title>
        <Card style={{width: '100%'}}>
        
        <List
        style={{
          height: 250,
          width: '100%',
          overflow: 'auto',
          padding: '0 16px',
          //border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
          dataSource={data3}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar
                  style={{
                    backgroundColor: '#87d068',
                  }}
                  icon={<UserOutlined />}
                />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
        </Card>
      </Col>

      
    </Row>

  </Card>

  </Content>                 
                 <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
                 </Layout>
                 </Layout>
                 </>
                );
        }
//}