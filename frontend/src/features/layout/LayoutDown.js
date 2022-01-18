import React, {useState} from "react";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { Row, Col, Menu,  Layout, Typography } from 'antd';
import { NavLink } from  "react-router-dom";
// import { useSelector } from 'react-redux';
// import {
//   selectRole,
//   selectMe
// } from '../rolechoice/rolechoiceSlice';
import {
    // AppstoreOutlined,
    // BarChartOutlined,
    // CloudOutlined,
    // ShopOutlined,
    // TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
const { Header } = Layout;
const { Title } = Typography;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export function LayoutDown() {

    return (
        <Menu theme="light" mode="inline" defaultSelectedKeys={['3']} style={{height: '100vh',}}>
      <div className="logo" />
        <Menu.Item key="1" icon={<UserOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Employees
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Clients
        </Menu.Item>
        </Menu>
     );
         
}