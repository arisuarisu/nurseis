import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select, Tag, Row, Col, Button, Avatar, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LoadingTable } from './LoadingTable';
import {
  DownloadOutlined 
} from '@ant-design/icons';
import {
    fetchEmployees,
    newEmployee,
    selectEmployees,
    editEmployee,
    deleteEmployee
  } from '../pages/employeesSlice';

import { CSVLink } from "react-csv";
import moment from 'moment';
const { Option } = Select;

const headers_nurses = [
    { label: "Firstname", key: "firstname" },
    { label: "Lastname", key: "lastname" }
  ];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  selectContractf,
  selectContractt,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  if(dataIndex==='gdpr'){
    //console.log('vypisujem diagnoses editable cell record', record)
    //console.log('vypisujem diagnoses editable cell children', children)
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
              required: false,
              message: `Please Input ${title}!`,
            },
          ]}
        >
           <Select
        //mode="multiple"
        allowClear
        placeholder="Select gdpr approval"
        //defaultValue={record.diagnosis} //array expected
        //defaultValue={members}
        initialValues={children[1]}
        style={{ width: '100%' }}
        //onChange={selectChange}
      >
        
        <Option value='yes'>yes</Option>
        <Option value='no'>no</Option>
      </Select>
        </Form.Item>
      ) : (
        <>
        {children}
           
           </>
      )}
    </td>
    )
  }
  if(dataIndex==='vaccine'){
    //console.log('vypisujem diagnoses editable cell record', record)
    //console.log('vypisujem diagnoses editable cell children', children)
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
              required: false,
              message: `Please Input ${title}!`,
            },
          ]}
        >
           <Select
        //mode="multiple"
        allowClear
        placeholder="Select vaccination"
        //defaultValue={record.diagnosis} //array expected
        //defaultValue={members}
        initialValues={children[1]}
        style={{ width: '100%' }}
        //onChange={selectChange}
      >
        
        <Option value='yes'>yes</Option>
        <Option value='no'>no</Option>
      </Select>
        </Form.Item>
      ) : (
        <>
        {children}
           
           </>
      )}
    </td>
    )
  }
  if(dataIndex==='contractf'){
    //console.log('vypisujem diagnoses editable cell record', record)
    //console.log('vypisujem diagnoses editable cell children', children)
    return (
      <td {...restProps}>
      {editing ? (
        <DatePicker defaultValue={moment(record.contractf, 'YYYY-MM-DD')} onChange={selectContractf} />
      ) : (
        <>
        {children}
           
           </>
      )}
    </td>
    )
  }
  if(dataIndex==='contractt'){
    //console.log('vypisujem diagnoses editable cell record', record)
    //console.log('vypisujem diagnoses editable cell children', children)
    return (
      <td {...restProps}>
      {editing ? (
        <DatePicker defaultValue={moment(record.contractt, 'YYYY-MM-DD')} onChange={selectContractt} />
      ) : (
        <>
        {children}
           
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

export function EditableEmployees () {
    const dispatch = useDispatch();
  const [form] = Form.useForm();
  const datadata = useSelector(selectEmployees);
  console.log('vypisujem datadata', datadata)
  const [data, setData] = useState([]);
  console.log('vypisujem data ako primarny stav po rerendernuti blabla', data)
  const [dataCSV, setDataCSV] = useState([])
  // const [rerender, setRerender] = useState(false)
  console.log(data, 'vypisujem data z editable2')
  const loading = false //useSelector(selectLoading);
  const [newclient, setNewclient] = useState(false);
  // const datas=props.data
  // const [data, setData]=useState(data);
  //const data = useSelector(selectClients);
  const [editingKey, setEditingKey] = useState('');
  const [contractf_date, setContractf_date] = useState('');
  const [contractt_date, setContractt_date] = useState('');

  const emptyclient = [{key: '0', firstname: '', lastname: '', address: '', editable: true}]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setDataCSV([...selectedRows])
      console.log(dataCSV, 'pridavanie rows do dataCSV')
    },
  };

  const selectContractf = (_, date) => {
    setContractf_date(date)
    console.log('vypisujem contract date from', date)
  }

  const selectContractt = (_, date) => {
    setContractt_date(date)
    console.log('vypisujem contract date to', date)
  }

  const title = () => {
    return(
      <Row justify="space-between" align="middle">
        <Col>Nurses</Col>
        <Col>
          <Button type="primary" onClick={addnew} disabled={newclient}>Add nurse</Button>
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
    dispatch(fetchEmployees())
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
                    setData([].concat(emptyclient, data))
                    setEditingKey('0')
                }
                    },[newclient]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log('vypisujem ROW: ', row)
      if(editingKey==='0'){
        dispatch(newEmployee({firstname: row.firstname, lastname: row.lastname, phone: row.phone, contractf: contractf_date, contractt: contractt_date, gdpr: row.gdpr, vaccine: row.vaccine}))
        //dispatch(fetchEmployees())
        data.slice(0, 1) 
      }else{
        dispatch(editEmployee({id: key, firstname: row.firstname, lastname: row.lastname, phone: row.phone, contractf: contractf_date, contractt: contractt_date, gdpr: row.gdpr, vaccine: row.vaccine}))
      }
      
      
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
    dispatch(fetchEmployees())
  };

  const columns_nurses = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      width: '11%',
      editable: true,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      width: '12%',
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '11%',
      editable: true,
    },
    {
      title: 'Contract from',
      dataIndex: 'contractf',
      width: '11%',
      editable: true,
    },
    {
      title: 'Contract to',
      dataIndex: 'contractt',
      width: '11%',
      editable: true,
    },
    {
      title: 'GDPR',
      dataIndex: 'gdpr',
      width: '11%',
      editable: true,
    },
    {
      title: 'Covid vaccine',
      dataIndex: 'vaccine',
      width: '11%',
      editable: true,
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      width: '11%',
      editable: false,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Row justify="space-around">
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
            </Row>
        ) : (
          <Row justify="space-around">
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
            </Row>
        )},
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      width: '11%',
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

  const mergedColumns_nurses = columns_nurses.map((col) => {
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
        selectContractf: selectContractf,
        selectContractt: selectContractt
      }),
    };
  });
  
    if(loading===true){
      return (<LoadingTable columns={columns_nurses} title={title} />);
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
        columns={mergedColumns_nurses}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        style={{width: '100%'}}
        title={title} 
        footer={() => <CSVLink data={dataCSV} headers={headers_nurses} filename={"records.csv"}><DownloadOutlined style={{ fontSize: '25px' }} /></CSVLink>}
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