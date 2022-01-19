import React, {useState} from "react";
//import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { Layout, Menu, Typography } from 'antd';
import { Link } from  "react-router-dom";
import { useSelector } from 'react-redux';
import {
    selectSelected,
    selectOpen
} from './menuSlice';
//import './nav.css';
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
const { Header, Sider } = Layout;
const { Title } = Typography;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export function Navigation(props) {
  // const [selectedkeys, setSelectedkeys] = useState(useSelector(selectSelected));
  // const [openkeys, setOpenkeys] = useState(useSelector(selectOpen));
  //const dispatch = useDispatch();

  // useEffect(() => {
  //   const selectedkeys = useSelector(selectSelected)//['13']
  //   const openkeys = useSelector(selectOpen)//['sub0'])
  //       },[selectedkeys, openkeys]);

    // const selectedkeys = useSelector(selectSelected)//['13']
    // const openkeys = useSelector(selectOpen)//['sub0']
    //console.log("vypisujem selected", selectedkeys)
    //console.log("vypisujem open", openkeys)

    return (

      <Sider style={{
        backgroundColor: 'white',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}>
        
        <Menu
        // onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={props.selectedkeys}
        defaultOpenKeys={props.openkeys}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <UploadOutlined />
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1"><Link to="/dashboard">Option 1</Link></Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <UploadOutlined />
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <UploadOutlined />
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
        <Menu.Item key="13" icon={<UploadOutlined />}>
        <Link to="/clients">Clients</Link>
        </Menu.Item>
        <Menu.Item key="14" icon={<UploadOutlined />}>
        <Link to="/employees">Employees</Link>
        </Menu.Item>
      </Menu>
        </Sider> 

        
     );
         
}