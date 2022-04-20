import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, DatePicker, Table, Badge, Menu, Dropdown, Space, Tag, Button, Form, Input, Typography, InputNumber, Popconfirm, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
    fetchTeamMembers,
    fetchMembers,
    fetchCalendar,
    selectTmembers,
    selectMembers,
    selectCalendar,
    selectLoading,
    newTeam,
    addTeam,
    editTeam
  } from '../pages/teamsSlice';
  const { Option } = Select;

export function NestedTeams() {
    const todaydate = new Date();
    //const today = todaydate.getFullYear()+'-'+(todaydate.getMonth()+1)
    const today = [todaydate.getFullYear(), todaydate.getMonth()+1]
    //console.log(today, 'vypisujem defalutny dnesny rok-mesiac')
    const dispatch = useDispatch();
    const tmemberslist = useSelector(selectTmembers);
    const memberslist = useSelector(selectMembers);
    const [data, setData] = useState([]);
    const [dataMain, setDataMain] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [expKeys, setExpKeys] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fetchTeamMembers({year: selectedDate[0], month: selectedDate[1]}))
        console.log('vypisujem fetchteammembers selected date', selectedDate)
        dispatch(fetchMembers({year: selectedDate[0], month: selectedDate[1]}))
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
        const date=dateString.split("-");
        setSelectedDate(date)
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

      const isEditing = (record) => record.key === editingKey;

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
          //setNewclient(false)
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };

      const columns_exp = [
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

      const mergedColumns_teams = columns_exp.map((col) => {
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

  const expandedRowRender = row => {
    
    console.log('vypisujem data v expandable', data)
    const dataexp = data.filter(item => item.table===row.key)

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
    return( 
    <Form form={form} component={false}>
      <Table columns={mergedColumns_teams} 
              dataSource={dataexp} 
              rowClassName="editable-row"
              pagination={false} 
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              />
    </Form>
      )
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
    { title: 'Action', key: 'operation', render: () => <span><a>Add new</a><a>Delete</a></span> },
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