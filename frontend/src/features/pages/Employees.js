//import React, { useEffect } from 'react';
import React, { useEffect } from 'react';
import { Navigation } from '../layout/Navigation';
import { Navbar2 } from '../navbar/Navbar2';
import { useDispatch } from 'react-redux';
// import {
//     selectShopitems,
//     selectMyshopitems,
//     fetchCatshopitems,
//     buyItem
//   } from './catshopSlice';
//import './catshop.css'
import {
  setSelectedKeys,
  setOpenKeys
} from '../layout/menuSlice';
import { Breadcrumb, Layout} from 'antd';
//import { Typography } from 'antd';
const { Content, Header, Footer } = Layout;

export function Employees() {
//   const shopitemlist = useSelector(selectShopitems);
//   const myshopitemlist = useSelector(selectMyshopitems);
   const dispatch = useDispatch();

//   useEffect(() => {
//           dispatch(fetchCatshopitems())},[dispatch]);

useEffect(() => {
  //dispatch(fetchClients());
  dispatch(setSelectedKeys(['14']));
  dispatch(setOpenKeys(['sub0']));
},[dispatch]);

  return (
    <>
    <Layout className="layout" hasSider>
                
                <Navigation />  
                
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
                <Content style={{ padding: '0 50px' }}>

                <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="/employees">Employees</a>
    </Breadcrumb.Item>
    </Breadcrumb>

    </Content>                 
                 <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
                 </Layout>
                 </Layout>
    </>);
}