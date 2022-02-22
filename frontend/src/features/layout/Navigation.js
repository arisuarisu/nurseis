import React, {useState} from "react";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
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
    TeamOutlined,
    ForkOutlined,
    HourglassOutlined,
    CalendarOutlined,
    UploadOutlined,
    HomeOutlined,
    PoweroffOutlined,
    ReconciliationOutlined,
    SolutionOutlined
  } from '@ant-design/icons';
const { Header, Sider } = Layout;
const { Title } = Typography;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

async function onLogout () {
  await signOut();
  window.location.href = "/";
}

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
        //style={{ width: 256 }}
        //style={{ backgroundColor: '#001529'}}
        defaultSelectedKeys={props.selectedkeys}
        defaultOpenKeys={props.openkeys}
        mode="inline"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        <SubMenu
          key="sub1"
          title={
            <span>
              <ReconciliationOutlined />
              <span>Clients</span>
            </span>
          }
        >
          
            <Menu.Item key="2"><Link to="/clients">Overview</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/editpatient">Edit client</Link></Menu.Item>
            {/* <Menu.Item key="4"><Link to="/addclient">Find patient</Link></Menu.Item> */}
            <Menu.Item key="5"><Link to="/records">Records</Link></Menu.Item>

        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <ForkOutlined />
              <span>Nurses</span>
            </span>
          }
        >
          <Menu.Item key="6"><Link to="/nurses">Overview</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/editnurse">Edit nurse</Link></Menu.Item>
            {/* <Menu.Item key="8"><Link to="/findnurse">Find nurse</Link></Menu.Item> */}
        </SubMenu>

        <SubMenu
          key="sub3"
          title={
            <span>
              <TeamOutlined />
              <span>Teams</span>
            </span>
          }
        >
          <Menu.Item key="9"><Link to="/teams">Overview</Link></Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub4"
          title={
            <span>
              <CalendarOutlined />
              <span>Attendance</span>
            </span>
          }
        >
          <Menu.Item key="10"><Link to="/attendance">Overview</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="11" icon={<SolutionOutlined />}>
        <Link to="/diagnosis">Diagnosis</Link>
        </Menu.Item>
        <Menu.Item key="logout"  onClick={onLogout} icon={<PoweroffOutlined />}>
        Logout
        </Menu.Item>

      </Menu>
        </Sider> 

        
     );
         
}