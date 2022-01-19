import React, { useEffect } from 'react';
import { Breadcrumb, Layout, Calendar } from 'antd';
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

export function Dashboard() {
    // const dispatch = useDispatch();
    // const active = useSelector(selectActive);
    // const catfriends = useSelector(selectCatfriends);
    // let {jwtPayload} = useSessionContext();
    // let role = jwtPayload.role;

    // useEffect(() => {
    //     dispatch(setSelectedKeys(['1']));
    //     dispatch(setOpenKeys(['sub1']));
    // }, []);

            return (
              <>

              <Layout className="layout" hasSider>
                
                <Navigation selectedkeys={['1']} openkeys={['sub1']} />  
                
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

  <Calendar onPanelChange={console.log('panel changed')} /> 

  </Content>                 
                 <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
                 </Layout>
                 </Layout>
                 </>
                );
        }
//}