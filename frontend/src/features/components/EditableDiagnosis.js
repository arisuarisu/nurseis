import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select, Tag, Row, Col, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LoadingTable } from './LoadingTable';
import {
  DownloadOutlined 
} from '@ant-design/icons';
import {
    fetchDiagnosis,
    selectDiagnosis,
    selectLoading,
    newDiagnosis,
    editDiagnosis
  } from '../pages/diagnosisSlice';

import { CSVLink } from "react-csv";
const { Option } = Select;

const headers_teams = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Treatment", key: "treatment" },
  ];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  if(dataIndex==='members'){
    console.log('vypisujem members editable cell record', record)
    console.log('vypisujem members editable cell children', children)
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
      ) : (
        <>
        {record.members.map(option => {
          return(
          <Tag>{option}</Tag>)
           })} 
           </>
      )}
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

export function EditableDiagnosis () {
    const dispatch = useDispatch();
  const [form] = Form.useForm();
  const datadata = useSelector(selectDiagnosis);
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

  const emptyteam = [{key: '0', name: '', description: '', treatment: '', editable: true}]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setDataCSV([...selectedRows])
      console.log(dataCSV, 'pridavanie rows do dataCSV')
    },
  };

  const title = () => {
    return(
      <Row justify="space-between" align="middle">
        <Col>Diagnoses</Col>
        <Col>
          <Button type="primary" onClick={addnew} disabled={newclient}>Add diagnosis</Button>
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
    dispatch(fetchDiagnosis())
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
      name: record.name,
      description: record.description,
      treatment: record.treatment,
      ...record,
    });
    setEditingKey(record.key);
    console.log('vypisujem record', record)
  };

  const cancel = () => {
    setEditingKey('');
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
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '35%',
      editable: true,
    },
    {
        title: 'Treatment',
        dataIndex: 'treatment',
        width: '35%',
        editable: true,
      },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '10%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
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