import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select, Tag, Row, Col, Button, Avatar, DatePicker } from 'antd';
import { PropertySafetyFilled, UserOutlined } from '@ant-design/icons';
import { LoadingTable } from './LoadingTable';
import {
  DownloadOutlined 
} from '@ant-design/icons';
import {
    fetchTeamMembers,
    selectTmembers,
    selectLoading,
    newTeam,
    addTeam,
    editTeam,
    deleteTeam
  } from '../pages/teamsSlice';

import { CSVLink } from "react-csv";
const { Option } = Select;

const headers_teams = [
  { label: "Teams", key: "teams" },
  { label: "Members", key: "members" }
];

const EditableCell = ({
editing,
dataIndex,
title,
inputType,
record,
index,
children,
deleteteam,
manage,
...restProps
}) => {
const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
//console.log('vypisujem dataindex', props.record)
if(dataIndex==='members'){
  console.log('vypisujem members editable cell record', record)
  console.log('vypisujem members editable cell children', children)
  return (
    <td {...restProps}>
      {/* {console.log('vypisujem record vovnutri', record)} */}
    {/* {editing ? (
      <Form.Item
        name={dataIndex}
        style={{
          margin: 0,
        }}
        rules={[
          {
            required: true,
            message: `Please Input ${title}!`,
          },
        ]}
      >
         <Select
      mode="multiple"
      placeholder="Select members"
      //defaultValue={record.diagnosis} //array expected
      //defaultValue={members}
      defaultValue={children[1]}
      style={{ width: '100%' }}
    >
      {children[1].map(option => {
        return(
      <Option value={option}>{option}</Option>)
       })} 
    </Select>
      </Form.Item>
      ) : ( */}
    
      <>
      {record.members.map(option => {
      // data[record.key].map(option => {
        return(
        <Tag>{option}</Tag>)
         })} 
         </>
    
    
  </td>
  )
}
else if(dataIndex==='operation'){
  return(
    <td {...restProps}>
  <span>
            <Popconfirm title="Sure to delete?" onConfirm={deleteteam(record)}>
              <a>Delete</a>
            </Popconfirm>
            <Typography.Link
              onClick={manage(record)}
              style={{
                marginRight: 8,
              }}
            >
              Manage
            </Typography.Link>
          </span>
          </td>
  )
}
else{
return (
  <td {...restProps}>
    {editing ? (
      <Form.Item
        name={dataIndex}
        style={{
          margin: 0,
        }}
        rules={[
          {
            required: true,
            message: `Please Input ${title}!`,
          },
        ]}
      >
        {inputNode}
      </Form.Item>
    ) : (
      children
    )}
  </td>
);}
};

export function EditableTeam (props) {
    const dispatch = useDispatch();
    const todaydate = new Date();
    const today = [todaydate.getFullYear(), todaydate.getMonth()+1]
  const [form] = Form.useForm();
  const datadata = useSelector(selectTmembers);
  console.log('vypisujem timy', datadata)
  const [data, setData] = useState([]);
  //console.log('vypisujem data ako primarny stav po rerendernuti blabla', data)
  const [dataCSV, setDataCSV] = useState([])
  // const [rerender, setRerender] = useState(false)
  //console.log(data, 'vypisujem data z editable2')
  const loading = useSelector(selectLoading);
  const [newclient, setNewclient] = useState(false);
  // const datas=props.data
  // const [data, setData]=useState(data);
  //const data = useSelector(selectClients);
  const [editingKey, setEditingKey] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);

  const emptyteam = [{key: '0', team: '', members: [], editable: true}]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setDataCSV([...selectedRows])
      console.log(dataCSV, 'pridavanie rows do dataCSV')
    },
  };

  useEffect(() => {
    if(selectedDate===''){
        setSelectedDate(today)
    } 
            },[selectedDate]);

  function onDateSelect(_, dateString) {
    //console.log(date, dateString);
    const date=dateString.split("-");
    setSelectedDate(date)
    console.log(selectedDate, 'vypisujem selected date');
  }

  const title = () => {
    return(
      <Row justify="space-between" align="middle">
        <Col>Team</Col>
        <Col>
        <DatePicker onChange={onDateSelect} picker="month" />
            <Button type="primary" onClick={() => dispatch(addTeam({name: 'asdasd'}))} >Add team</Button> 
        </Col>
      </Row>
    )
  }

  const addnew = () => {
    setNewclient(true);
  }

  const cancelnew = () => {
    setNewclient(false);
  }

  useEffect(() => {
    dispatch(fetchTeamMembers({year: selectedDate[0], month: selectedDate[1]}))
        },[dispatch]);

        useEffect(() => {
          console.log('vypisujem data zo stavu po rendernuti useeffect', data)
          //props.rerender()
          setData(datadata)
              },[datadata]);

              useEffect(() => {
                console.log('new was clicked')
                //if(editingKey==='')
                if(newclient===true){
                    setData([].concat(emptyteam, data))
                    setEditingKey('0')
                }
                    },[newclient]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      team: 'Tím '+record.key,
      //members: record.members,
      ...record,
    });
    setEditingKey(record.key);
    console.log('vypisujem record', record)
  };

  const cancel = () => {
    setEditingKey('');
  };

  const deleteteam = (record) => {
    dispatch(deleteTeam({id: record.key}))
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log('vypisujem ROW: ', row)
      console.log('vypisujem key v save', key, typeof(key))
      // if(key==='0'){
      //   dispatch(newTeam({members: row.members}))
      // }
      // else{
      // dispatch(editTeam({id: key, members: row.members}))
      // }
      
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
      setNewclient(false)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns_teams = [
    {
      title: 'Nurse',
      dataIndex: 'nurse',
      width: '20%',
      editable: false,
      //render: (_, record) => "Tím "+record.key,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      width: '20%',
      editable: false,
      //render: (_, record) => "Tím "+record.key,
    },
    {
      title: 'From',
      dataIndex: 'pat_from',
      width: '25%',
      editable: true,
    },
    {
      title: 'To',
      dataIndex: 'pat_to',
      width: '25%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      width: '10%',
      //render: record => {
       render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteteam(record.key)}>
              <a>Delete</a>
            </Popconfirm>
            <Typography.Link
              onClick={() => props.manage(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Manage
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns_teams = columns_teams.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        //deleteteam: deleteteam,
        //manage: props.manage
      }),
    };
  });
  
    if(loading===true){
      return (<LoadingTable columns={columns_teams} title={title} />);
    }else{
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns_teams}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        style={{width: '100%'}}
        title={title} 
        footer={() => <CSVLink data={dataCSV} headers={headers_teams} filename={"records.csv"}><DownloadOutlined style={{ fontSize: '25px' }} /></CSVLink>}
        rowSelection={rowSelection}
      />
    </Form>
  );
    }
};

//ReactDOM.render(<EdiTable2 />, mountNode);

// .editable-row .ant-form-item-explain {
//   position: absolute;
//   top: 100%;
//   font-size: 12px;
// }