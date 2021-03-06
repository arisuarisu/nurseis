import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select, Tag, Row, Col, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LoadingTable } from './LoadingTable';
import {
  DownloadOutlined 
} from '@ant-design/icons';
import {
    fetchClients,
    selectClients,
    selectLoading,
    newClient,
    editClient,
    deleteClient
  } from '../pages/clientsSlice';
  import {
    fetchDiagnosis,
    selectDiagnosis,
    // selectLoading,
    // newDiagnosis,
    // editDiagnosis
  } from '../pages/diagnosisSlice';

import { CSVLink } from "react-csv";
const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  diagnoseslist,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  const selectChange = value => {
    console.log('vypisujem diagnosis select value', value)
  }
  if(dataIndex==='diagnosis'){
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
        mode="multiple"
        allowClear
        placeholder="Select diagnoses"
        //defaultValue={record.diagnosis} //array expected
        //defaultValue={members}
        initialValues={children[1]}
        style={{ width: '100%' }}
        onChange={selectChange}
      >
        {diagnoseslist.map(option => {
          return(
        <Option value={option.name}>{option.name}</Option>)
         })} 
      </Select>
        </Form.Item>
      ) : (
        <>
        {//record.diagnoses.map(option => {
          //['alic', 'palic'].map(option => {
          record.diagnosis.map(option => {
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

export function EditableClients () {
    const dispatch = useDispatch();
  const [form] = Form.useForm();
  const datadata = useSelector(selectClients);
  console.log('vypisujem datadata', datadata)
  const [data, setData] = useState([]);
  console.log('vypisujem data ako primarny stav po rerendernuti blabla', data)
  const [dataCSV, setDataCSV] = useState([])
  // const [rerender, setRerender] = useState(false)
  console.log(data, 'vypisujem data z editable2')
  const loading = useSelector(selectLoading);
  const [newclient, setNewclient] = useState(false);
  // const datas=props.data
  // const [data, setData]=useState(data);
  //const data = useSelector(selectClients);
  const [editingKey, setEditingKey] = useState('');
  const [selectArray, setSelectArray] = useState([]);
  const [diagnoseslist, setDiagnoseslist] = useState([]);
  const diagnoses = useSelector(selectDiagnosis);
  //const diagnoseslist = ['ostheoporosis', 'anemia', 'lying patient']
  //const diagnoseslist = diagnoses.filter(diagnosis => diagnosis.name)
  //let diagnoseslist2 = []
  // for(let i; i<diagnoses.length; i++){
  //   console.log('vypisujem diagnosis name', diagnoses[i].name)
  //   diagnoseslist.push(diagnoses[i].name)
  // }
  console.log('vypisujem diagnoseslist', diagnoseslist)
  const emptyclient = [{key: '0', firstname: '', lastname: '', address: '', editable: true}]

  const headers_clients = [
    { label: "Firstname", key: "firstname" },
    { label: "Lastname", key: "lastname" },
    { label: "Address", key: "address" }
  ];
  
  const selectChange = (array) => { 
    setSelectArray(array)
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setDataCSV([...selectedRows])
      //console.log(dataCSV, 'pridavanie rows do dataCSV')
    },
  };

  

  const title = () => {
    return(
      <Row justify="space-between" align="middle">
        <Col>Clients</Col>
        <Col>
          <Button type="primary" onClick={addnew} disabled={newclient}>Add client</Button>
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
    dispatch(fetchClients())
    dispatch(fetchDiagnosis())
        },[dispatch]);

        useEffect(() => {
          console.log('vypisujem data zo stavu po rendernuti useeffect', data)
          //props.rerender()
          setData(datadata)
              },[datadata]);

              useEffect(() => {
                // console.log('vypisujem diagnoses', diagnoses)
                // let diagnoseslist2 = []
                // for(let i; i<diagnoses.length; i++){
                //   console.log('vypisujem diagnosis name', diagnoses[i].name)
                //   diagnoseslist2.push(diagnoses[i].name)
                // }
                // console.log(diagnoseslist2, 'vypiusuejm diagnosislist2')
                // setDiagnoseslist([...diagnoseslist2])
                setDiagnoseslist([...diagnoses])
                    },[diagnoses]);      

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
    console.log('editujem record cislo ', record.key)
    form.setFieldsValue({
      firstname: record.firstname,
      lastname: record.lastname,
      address: record.address,
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    // if(editingKey==='0'){
    //   cancelnew()
    // }
    setEditingKey('');
  };

  const deleteclient = () => {
    // if(editingKey==='0'){
    //   cancelnew()
    // }
    //console.log('vypisujem id deletujuceho klienta', editingKey)
    dispatch(deleteClient({id: editingKey}))
    console.log('vypisujem editing key preed nulnutim v delete', editingKey)
    setEditingKey('');
    dispatch(fetchClients())
    console.log('vypisujem editing key po nulnuti v delete', editingKey)
    //setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log('vypisujem ROW: ', row)
      //console.log()
      //dispatch(newClient({firstname: row.firstname, lastname: row.lastname, address: row.address, diagnosis: ['1', '2']}))
      if(key==='0'){
        console.log('dispatching new client with values', row.firstname, row.lastname, row.address, row.diagnosis)
        dispatch(newClient({firstname: row.firstname, lastname: row.lastname, address: row.address, diagnosis: row.diagnosis}))
        //dispatch(fetchClients())
        data.slice(0, 1)  
      }
        else{
          console.log('dispatching edit client with values', key, row.firstname, row.lastname, row.address, row.diagnosis)
        dispatch(editClient({id: key, firstname: row.firstname, lastname: row.lastname, address: row.address, diagnosis: row.diagnosis}))
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
        // console.log('vypisujem newData BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', data)
      }
      setNewclient(false)
      // if(editingKey==='0'){
      //   cancelnew()
      // }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
    dispatch(fetchClients())
  };

  const columns_clients = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      width: '20%',
      editable: true,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      width: '20%',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '20%',
      editable: true,
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      width: '20%',
      editable: true,
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      width: '10%',
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
            <Popconfirm title="Sure to delete?" onConfirm={deleteclient}>
          <a>Delete</a>
        </Popconfirm>
        </span>
        ) : (
          <span>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        </span>
        );
      },
    },
  ];

  const mergedColumns_clients = columns_clients.map((col) => {
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
        diagnoseslist: diagnoseslist
      }),
    };
  });
  
    if(loading===true){
      return (<LoadingTable columns={columns_clients} title={title} />);
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
        columns={mergedColumns_clients}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        style={{width: '100%'}}
        title={title} 
        footer={() => <CSVLink data={dataCSV} headers={headers_clients} filename={"records.csv"}><DownloadOutlined style={{ fontSize: '25px' }} /></CSVLink>}
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