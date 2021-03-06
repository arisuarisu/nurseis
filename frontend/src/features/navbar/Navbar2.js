import React, {useState} from "react";
//import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { Row, Col, Menu,  Layout, Typography, Avatar, Switch } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import { NavLink } from  "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import {
//   selectRole,
//   selectMe
// } from '../rolechoice/rolechoiceSlice';
import {
  changeRole,
  selectRole
} from '../pages/roleSlice';
const { Header } = Layout;
const { Title } = Typography;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// async function onLogout () {
//   await signOut();
//   window.location.href = "/";
// }

// const url='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/';
// const png='.png';

export function Navbar2() {
  const dispatch = useDispatch();
   const [current, setCurrent] = useState('mail');
   //const [checked, setChecked] = useState(true);
  // const role = useSelector(selectRole);
  // const me = useSelector(selectMe);

  function onChange (checked){
    console.log('switch checked is', checked)
    if(checked===true){
      console.log('switch checked is', checked)
      dispatch(changeRole('admin'));
      //setChecked(false)
    }else{
      console.log('switch checked is', checked)
      dispatch(changeRole('nurse'));
      //setChecked(true)
    }
  }

  // if(role==='cat' || role==='owner') {  
    return (
        <Header style={{backgroundColor: 'white'}}>
          <Row>
            <Col span={12}>
              {/* <Title style={{color: 'white', lineHeight: '64px'}}>NurseIS</Title>   */}
            </Col>
      <Col span={12}> 
      <Row justify="end">
        {/* <Col><Switch defaultChecked checkedChildren="nurse" unCheckedChildren="admin" onChange={onChange} /></Col> */}
        <Col>
        <Avatar
      style={{
        backgroundColor: '#87d068',
      }}
      icon={<UserOutlined />}
    />  Firstname Lastname
      {/* <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal" theme="light">
        <SubMenu title="Firstname Lastname">
        <Avatar
      style={{
        backgroundColor: '#87d068',
      }}
      icon={<UserOutlined />}
    />
          
            <MenuItemGroup>
            

            <Menu.Item key="logout" onClick={onLogout}>Logout</Menu.Item>
          </MenuItemGroup>
           
        </SubMenu>
      </Menu> */}
      </Col>
      </Row>  
      </Col>
      </Row>
      </Header>
     );
         
}