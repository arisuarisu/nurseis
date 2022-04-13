import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, DatePicker, Table, Badge, Menu, Dropdown, Space, Tag, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
    fetchTeamMembers,
    fetchMembers,
    selectTmembers,
    selectMembers,
    selectLoading,
    newTeam,
    addTeam,
    editTeam
  } from '../pages/teamsSlice';

export function NestedTeams() {
    const todaydate = new Date();
    const today = todaydate.getFullYear()+'-'+(todaydate.getMonth()+1)
    //console.log(today, 'vypisujem defalutny dnesny rok-mesiac')
    const dispatch = useDispatch();
    const tmemberslist = useSelector(selectTmembers);
    const memberslist = useSelector(selectMembers);
    const [data, setData] = useState([]);
    const [dataMain, setDataMain] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [expKeys, setExpKeys] = useState([]);

    useEffect(() => {
        dispatch(fetchTeamMembers({date: selectedDate}))
        dispatch(fetchMembers({date: selectedDate}))
            },[dispatch]);

        useEffect(() => {
            setDataMain(tmemberslist)   
                    },[tmemberslist]);

                    useEffect(() => {
                        setData(memberslist)   
                                },[memberslist]);

                                useEffect(() => {
                                    if(selectedDate===''){
                                        setSelectedDate(today)
                                    } 
                                            },[selectedDate]);

    function onDateSelect(_, dateString) {
        //console.log(date, dateString);
        setSelectedDate(dateString)
        console.log(selectedDate);
      }

    const title = () => {
        return(
          <Row justify="space-between" align="middle">
            <Col>Team members</Col>
            <Col>
            <DatePicker onChange={onDateSelect} picker="month" />
            <Button type="primary" onClick={() => dispatch(addTeam({name: 'asdasd'}))} >Add team</Button> 
            {/* disabled={newclient} */}
            </Col>
          </Row>
        )
      }

  const expandedRowRender = row => {
    const columns = [
      { title: 'Firstname', dataIndex: 'firstname', key: 'firstname', editable: true },
      { title: 'Lastname', dataIndex: 'lastname', key: 'lastname', editable: true },
      { title: 'Date range', dataIndex: 'dateRange', key: 'dateRange', editable: true, 
      render: (_, record) => (
        <span>
          {data[record.key].mem_from+' - '+data[record.key].mem_to}
        </span>
      ),
     },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Save</a>
            <a>Cancel</a>
          </Space>
        ),
      },
    ];
    console.log('vypisujem data v expandable', data)
    const dataexp = data.filter(item => item.key===row.key)

    // const data = [
    //     {key: '1', firstname: 'alex', lastname: 'Upgraded: 56', dateRange: '2014-12-24 23:12:00'},
    //     {key: '2', firstname: 'pato', lastname: 'Upgraded: 56', dateRange: '2014-12-24 23:12:00'},
    //     {key: '3', firstname: 'baka', lastname: 'Upgraded: 56', dateRange: '2014-12-24 23:12:00'}

    // ];
    // for (let i = 0; i < 3; ++i) {
    //   data.push({
    //     key: i,
    //     firstname: 'This is production name',
    //     lastname: 'Upgraded: 56',
    //     dateRange: '2014-12-24 23:12:00',
    //   });
    // }
    return <Table columns={columns} dataSource={dataexp} pagination={false} />;
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (_, record) => <span>{'Team '+record.key}</span> },
    { title: 'Members', dataIndex: 'members', key: 'members' , 
    // onCell: record => (
      render: (_, record) => (
      <span>
        {console.log('vypisujem v members record.key', record.key)}
        {console.log('vypisujem record', record)}
        {/* {dataMain[record.key].members!==[] ? dataMain[record.key] */}
        {record.members.map((member, index) => {
          console.log('vypsiujem vnutro memberov', member)
          return (
            <Tag key={index}>
              {member}
            </Tag>
          );
        }) }
        {/* : <span></span> } */}
      </span>
    ),},
    { title: 'Action', key: 'operation', render: () => <a>Add new</a> },
  ];

  // const data1 = [];
  // for (let i = 0; i < 3; ++i) {
  //   data.push({
  //     key: i,
  //     name: 'asdasdasd',
  //     members: ['asdas anlsd', 'pato', 'natalia'],
  //   });
  // }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{expandedRowRender}}
      //expandedRowKeys={expKeys}
      dataSource={dataMain}
      title={title}
      footer = {() => 'adas'}
    />
  );
}