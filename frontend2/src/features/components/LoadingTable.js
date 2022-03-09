import React, { useEffect, useState } from 'react';
import { Table, Input, Popconfirm, Button, Spin, Skeleton } from 'antd';

export function LoadingTable(props){
    //const [data, setData] = useState(props.data);
    //console.log(data, "vypisujem data z editable")

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  //if (index === 4) {
    obj.props.colSpan = 0;
  //}
  return obj;
};

const columns = [
  {
    title: 'Firstname',
    dataIndex: 'firstname',
    render: (text, row, index) => {
    // //   if (index < 4) {
    // //     return <a>{text}</a>;
    // //   }
      return {
        children: <Skeleton title={false} paragraph={{ rows: 15, width: '100%' }} active/>, //<a>{text}</a>,
        props: {
          colSpan: 5,
        },
      };
    },
  },
  {
    title: 'Lastname',
    dataIndex: 'lastname',
    render: renderContent,
  },
  {
    title: 'Home phone',
    dataIndex: 'tel',
    render: renderContent,
    // render: (value, row, index) => {
    //   const obj = {
    //     children: value,
    //     props: {},
    //   };
    //   if (index === 2) {
    //     obj.props.rowSpan = 2;
    //   }
    //   // These two are merged into above cell
    //   if (index === 3) {
    //     obj.props.rowSpan = 0;
    //   }
    //   if (index === 4) {
    //     obj.props.colSpan = 0;
    //   }
    //   return obj;
    // },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    render: renderContent,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: renderContent,
  },
];

const data = [
  {
    key: '1',
    firstname: 'John Brown',
    lastname: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  }
];

//       const data = [];
// for (let i = 0; i < 10; i++) {
//   data.push({
//     key: i,
//     firstname: '',
//     lastname: '',
//     tel: '',
//     phone: '',
//     address: '',
//   });
// }
    
    return (
    // <Skeleton active paragraph={{ rows: 10 }} />
    <Table bordered dataSource={data} columns={columns} style={{width: '100%'}} 
                  title={() => 'Clients'} footer={() => 'Icons for printing'}/>
    );
}