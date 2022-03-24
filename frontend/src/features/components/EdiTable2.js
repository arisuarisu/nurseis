import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select, Tag } from 'antd';
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
 
// const originData = [];

// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

import { CSVLink } from "react-csv";
const { Option } = Select;

const headers_clients = [
  { label: "Firstname", key: "firstname" },
  { label: "Lastname", key: "lastname" },
  { label: "Address", key: "address" }
];

const headers_nurses = [
  { label: "Firstname", key: "firstname" },
  { label: "Lastname", key: "lastname" }
];

const headers_attendance = [
  { label: "Name", key: "name" },
  { label: "Arrival", key: "arrival" },
  { label: "Lunch from", key: "lunch_from" },
  { label: "Lunch to", key: "lunch_to" },
  { label: "Departure", key: "departure" },
];

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

export function EdiTable2 (props) {
    const dispatch = useDispatch();
  const [form] = Form.useForm();
  const datadata = useSelector(selectClients);
  console.log('vypisujem datadata', datadata)
  const [data, setData] = useState([]);
  console.log('vypisujem data ako primarny stav po rerendernuti blabla', data)
  const [dataCSV, setDataCSV] = useState([])
  // const [rerender, setRerender] = useState(false)
  console.log(data, 'vypisujem data z editable2')
  // const datas=props.data
  // const [data, setData]=useState(data);
  //const data = useSelector(selectClients);
  const [editingKey, setEditingKey] = useState('');

  const newclient = [{key: '0', firstname: '', lastname: '', address: '', editable: true}]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setDataCSV([...selectedRows])
      console.log(dataCSV, 'pridavanie rows do dataCSV')
    },
  };

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
                setData([].concat(newclient, data))
                setEditingKey('0')
                    },[props.new]);

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
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns_clients = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      width: '25%',
      editable: true,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      width: '15%',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      width: '40%',
      render: (diagnosis, record) => {
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
          <Tag>BLABLA</Tag>
        ):(
          <Form.Item
          name="select-multiple"
          label="Select[multiple]"
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
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        style={{ width: '100%' }}
      >
        <Option value="a10">Blue</Option>
        <Option value="c12">red</Option>
        <Option value="blue">green</Option>
      </Select>
      </Form.Item>
        );
      },
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
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

  const columns_nurses = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      width: '25%',
      editable: true,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      width: '15%',
      editable: true,
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
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

  const columns_attendance = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Arrival',
      dataIndex: 'arrival',
      width: '15%',
      editable: true,
    },
    {
      title: 'Lunch from',
      dataIndex: 'lunch_from',
      width: '40%',
      editable: true,
    },
    {
      title: 'Lunch to',
      dataIndex: 'lunch_to',
      width: '40%',
      editable: true,
    },
    {
      title: 'Departure',
      dataIndex: 'departure',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
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

  const columns_teams = [
    {
      title: 'Team',
      dataIndex: 'team',
      width: '25%',
      editable: true,
    },
    {
      title: 'Members',
      dataIndex: 'members',
      width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
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
      }),
    };
  });

  const mergedColumns_attendance = columns_attendance.map((col) => {
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

  if(props.type==='clients'){
    if(props.loading===true){
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
        title={props.title} 
        footer={() => <CSVLink data={dataCSV} headers={headers_clients} filename={"records.csv"}><DownloadOutlined style={{ fontSize: '25px' }} /></CSVLink>}
        rowSelection={rowSelection}
      />
    </Form>
  );}}
  else if(props.type==='nurses'){
    if(props.loading===true){
      return (<LoadingTable columns={columns_nurses} />);
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
          title={props.title} 
          footer={() => <CSVLink data={dataCSV} headers={headers_nurses} filename={"records.csv"}><DownloadOutlined style={{ fontSize: '25px' }} /></CSVLink>}
          rowSelection={rowSelection}
        />
      </Form>
    );
  }}
  else if(props.type==='attendance'){
    if(props.loading===true){
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
          columns={mergedColumns_attendance}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          style={{width: '100%'}}
          title={props.title} 
          footer={() => <CSVLink data={dataCSV} headers={headers_attendance} filename={"records.csv"}><DownloadOutlined style={{ fontSize: '25px' }} /></CSVLink>}
          rowSelection={rowSelection}
        />
      </Form>
    );
  }}
  else if(props.type==='teams'){
    if(props.loading===true){
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
          columns={mergedColumns_teams}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          style={{width: '100%'}}
          title={props.title} 
          footer={() => <CSVLink data={dataCSV} headers={headers_teams} filename={"records.csv"}><DownloadOutlined style={{ fontSize: '25px' }} /></CSVLink>}
          rowSelection={rowSelection}
        />
      </Form>
    );
  }}
  else{
    return <></>;
  }
};

//ReactDOM.render(<EdiTable2 />, mountNode);

// .editable-row .ant-form-item-explain {
//   position: absolute;
//   top: 100%;
//   font-size: 12px;
// }