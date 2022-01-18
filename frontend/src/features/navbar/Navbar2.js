import React, {useState} from "react";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { Row, Col, Menu,  Layout, Typography } from 'antd';
// import { NavLink } from  "react-router-dom";
// import { useSelector } from 'react-redux';
// import {
//   selectRole,
//   selectMe
// } from '../rolechoice/rolechoiceSlice';
const { Header } = Layout;
const { Title } = Typography;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

async function onLogout () {
  await signOut();
  window.location.href = "/";
}

// const url='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/';
// const png='.png';

export function Navbar2() {

   const [current, setCurrent] = useState('mail');
  // const role = useSelector(selectRole);
  // const me = useSelector(selectMe);

  // if(role==='cat' || role==='owner') {  
    return (
        <Header style={{backgroundColor: 'white'}}>
          <Row>
            <Col span={12}>
              {/* <Title style={{color: 'white', lineHeight: '64px'}}>NurseIS</Title>   */}
            </Col>
      <Col span={12}> 
      <Row justify="end">
        <Col>
      <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal" theme="light">
        <SubMenu title="blabla">
          
          
            <MenuItemGroup>
            

            <Menu.Item key="logout" onClick={onLogout}>Logout</Menu.Item>
          </MenuItemGroup>
           
        </SubMenu>
      </Menu>
      </Col>
      </Row>  
      </Col>
      </Row>
      </Header>
     );
         
}