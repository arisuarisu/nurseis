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
    newClient
  } from '../pages/clientsSlice';

import { CSVLink } from "react-csv";
const { Option } = Select;

const headers_clients = [
  { label: "Firstname", key: "firstname" },
  { label: "Lastname", key: "lastname" },
  { label: "Address", key: "address" }
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
  );
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

  const emptyclient = [{key: '0', firstname: '', lastname: '', address: '', editable: true}]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setDataCSV([...selectedRows])
      console.log(dataCSV, 'pridavanie rows do dataCSV')
    },
  };

  const title = () => {
    return(
      <Row justify="space-between">
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
      dispatch(newClient({firstname: row.firstname, lastname: row.lastname, address: row.address, diagnosis: ['1', '2']}))
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
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
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
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          // {diagnosis.map(tag => {
          //   let color = tag.length > 5 ? 'geekblue' : 'green';
          //   if (tag === 'loser') {
          //     color = 'volcano';
          //   }
          //   return (
          //     <Tag color={color} key={tag}>
          //       {tag.toUpperCase()}
          //     </Tag>
          //   );
          // })}
          
        
          <Form.Item
          name="select-multiple"
          rules={[
            {
              //required: true,
              //message: 'Please select clients diagnoses',
              type: 'array',
            },
          ]}
        >
          <Select
        mode="multiple"
        placeholder="Select diagnosis"
        //defaultValue={record.diagnosis} //array expected
        defaultValue={['blabla']}
        style={{ width: '100%' }}
      >
        {/* {record.diagnosis.map(diagnosis => { */}
        {/* <Option value={diagnosis}>{diagnosis}</Option> */}
        <Option value='blabla'>blabla</Option>
        {/* })} */}
      </Select>
      </Form.Item>
        ):(
            <>
            {/* {record.diagnosis} */}
            <Tag>BLABLA</Tag>
            </>
        );
      },
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      width: '10%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
        ) : (
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
        )},
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
      }),
    };
  });
  
    if(loading===true){
      return (<LoadingTable columns={columns_clients} />);
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