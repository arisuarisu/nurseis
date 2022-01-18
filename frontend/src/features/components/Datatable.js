//import React, { useEffect } from 'react';
import React from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import './datatable.css'
import { Card, Col, Row,} from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Meta } = Card;
export function Datatable() {
    
const columns = [{
    title: 'Firstname',
    dataIndex: 'firstnname',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Lastname',
    dataIndex: 'lastname',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];

  return (
    <>
        
    </>);
}