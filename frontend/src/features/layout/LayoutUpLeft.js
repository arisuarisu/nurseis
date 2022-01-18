import React, {useState} from "react";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { Row, Col,  Layout, Typography } from 'antd';
import { NavLink } from  "react-router-dom";
import { Navigation } from './Navigation';
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
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

export function LayoutUpLeft() {

    const selectedkeys = ['13']
    const openkeys = ['sub0']

    return (
        <><Navigation /></>
     );
         
}