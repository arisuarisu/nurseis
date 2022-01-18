import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from  "react-router-dom";
//import { Mainscreen } from './features/mainscreen/Mainscreen';
import './App.css';
import { Layout, Menu } from 'antd';
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
import { Navbar2 } from './features/navbar/Navbar2';
import { Homescreen } from './features/homescreen/Homescreen';
// import { Rolechoice } from './features/rolechoice/Rolechoice';
// import { Getrole } from './features/rolechoice/Getrole';
import { Dashboard } from './features/dashboard/Dashboard';
import { Employees } from './features/pages/Employees';
import { Clients } from './features/pages/Clients';
// import { Catshop } from './features/catshop/Catshop';
// import { Accomodation } from './features/accomodation/Accomodation';
// import { Catfriends } from './features/catfriends/Catfriends';
// import {
//     setReduxRole
//   } from './features/rolechoice/rolechoiceSlice';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword, {EmailPasswordAuth} from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import axios from "axios";
const { Content, Header, Sider, Footer } = Layout;
Session.addAxiosInterceptors(axios);

const fontFamily = {fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, \'Noto Color Emoji\''}

const style = {style: {  
    container: {borderRadius: 0, ...fontFamily},
    divider: {display: 'none'}, //color: 'white',
    label: { display: 'none', ...fontFamily}, //color: 'white',
    inputContainer: {borderRadius: 0, ...fontFamily}, 
    inputWrapper: {borderRadius: 0, border: '1px solid #434343', ...fontFamily},
    inputError: {borderRadius: 0, ...fontFamily},                  
    button: {borderRadius: 0, ...fontFamily},                  
    }
}

SuperTokens.init({
    appInfo: {
        appName: "felis",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000"
    },
    recipeList: [
        EmailPassword.init({
            palette: {
                primary: '#0ecc8a', //'#642ab5',
                //error: '#f59842',
                //background: '#141414',
                //inputBackground: '#141414',
                // textTitle: 'white',
                // textLabel: 'white',
                // textInput: 'white',
                textLink: '#0ecc8a' //'white'
            },
            signInAndUpFeature: {
                disableDefaultImplementation: true,
                signUpForm: {                    
                    ...style
                },
                signInForm: {                    
                    ...style
                },
            },
            resetPasswordUsingTokenFeature: {                
                enterEmailForm: {                    
                    ...style            
                },
                submitNewPasswordForm: {                    
                    ...style               
                }             
            },
            emailVerificationFeature: {                
                sendVerifyEmailScreen: {                    
                    ...style              
                },
                verifyEmailLinkClickedScreen: {                    
                    ...style               
                }             
            },
            getRedirectionURL(context) {
                if (context.action === "SUCCESS") {
                    return context.redirectToPath === undefined ? "/dashboard" : context.redirectToPath;
                
                }
            }
        }
        ),
        Session.init()
    ]
});                         

function App() {

    return (
        <>
      <Router> 
      {/* <Layout className="layout" hasSider>
          
          <Sider style={{
        backgroundColor: 'white',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}>
        
      <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} style={{height: '100vh',}}>
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
        </Sider> 
          
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 0 }} ><Navbar2 /></Header> 
          <Content style={{ padding: '0 50px' }}> */}
          
                <Switch>
                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                                  
                        <Route exact path="/dashboard">
                            <EmailPasswordAuth>
                            <Dashboard />
                            </EmailPasswordAuth> 
                        </Route>

                        <Route exact path="/employees">
                            <EmailPasswordAuth>
                            <Employees />
                            </EmailPasswordAuth> 
                        </Route>

                        <Route exact path="/clients">
                            <EmailPasswordAuth>
                            <Clients />
                            </EmailPasswordAuth> 
                        </Route>

                        <Route exact path="/">
                        <Homescreen />
                        </Route>

                        <Route path="*">
                            <Redirect to="/dashboard"/>
                         </Route> 
                 </Switch>
                 {/* </Content>                 
                 <Footer style={{ textAlign: 'center' }}>NurseIS ©2022</Footer>
                 </Layout>
                 </Layout> */}
                 
            </Router>
      </>
  );
}

export default App;
