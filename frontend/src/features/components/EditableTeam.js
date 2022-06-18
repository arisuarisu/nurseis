import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select, Tag, Row, Col, Button, Avatar, DatePicker, TimePicker } from 'antd';
import { PropertySafetyFilled, UserOutlined } from '@ant-design/icons';
import { LoadingTable } from './LoadingTable';
import {
  DownloadOutlined 
} from '@ant-design/icons';
import {
    fetchNurses,
    fetchClients,
    fetchTeamPatients,
    selectNurses,
    selectClients,
    selectLoading,
    selectTpatients,
    selectPatients,
    addPatient,
    editPatient,
    deletePatient,
    fetchTeamCount,
    selectTeamCount
  } from '../pages/teamsSlice';

import { CSVLink } from "react-csv";
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;

const headers_teams = [
  { label: "Teams", key: "teams" },
  // { label: "", key: "teams" },
  // { label: "Teams", key: "teams" },
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
//deleteteam,
//manage,
nurses,
clients,
setPatFrom,
setPatTo,
setPatRange,
setPatDate,
...restProps
}) => {
const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

// const onChange = value =>{
//   record.pat_from=value.format('YYY-MM-DD')
//   console.log('vypisujem patfrom po change v editable cell', record.pat_from)
// }
//console.log('vypisujem dataindex', props.record)
if(dataIndex==='nurse'){
  //console.log('vypisujem members editable cell record', record)
  //console.log('vypisujem members editable cell children', children)
  console.log('vypisujem nurses v editable cell', nurses)
  return (
    <td {...restProps}>
      {/* {console.log('vypisujem record vovnutri', record)} */}
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
      //mode="multiple"
      placeholder="Select a nurse"
      //defaultValue={record.diagnosis} //array expected
      //defaultValue={members}
      defaultValue={children[1]}
      style={{ width: '100%' }}
    >
      {nurses.map(option => {
        return(
      <Option value={option.id}>{option.firstname+' '+option.lastname}</Option>)
       })} 
    </Select>
      </Form.Item>
      ) : (
    
      <>
        {record.nurse}
         </>)}
    
    
  </td>
  )
}
else if(dataIndex==='client'){
  return(
  <td {...restProps}>
      {/* {console.log('vypisujem record vovnutri', record)} */}
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
      //mode="multiple"
      placeholder="Select a client"
      //defaultValue={record.diagnosis} //array expected
      //defaultValue={members}
      defaultValue={children[1]}
      style={{ width: '100%' }}
    >
      {clients.map(option => {
        return(
      <Option value={option.id}>{option.firstname+' '+option.lastname}</Option>)
       })} 
    </Select>
      </Form.Item>
      ) : (
    
      <>
    {record.client}
         </>)}
          </td>
  )
}
else if(dataIndex==='time_from'){
  console.log("index je", index, record.id)
  return(
  <td {...restProps}>
    {!editing ? (
    <>
    {record.time_from}
       </>) : record.id===undefined ?
       //1===1 ?
  (
        <TimePicker onChange={setPatFrom} />
          ) :
          (
            <TimePicker defaultValue={moment(record.time_from, 'hh-mm-ss')} onChange={setPatFrom} />
              )
         }
          </td>
  )
}
else if(dataIndex==='time_to'){
  return(
  <td {...restProps}>
    {!editing ? (
    <>
    {record.time_to}
       </>) : record.id===undefined ?
       //1===1 ?
  (
        <TimePicker onChange={setPatTo} />
          ) :
          (
            <TimePicker defaultValue={moment(record.time_to, 'hh-mm-ss')} onChange={setPatTo} />
              )
         }
          </td>
  )
}
else if(dataIndex==='pat_date'){
  return(
  <td {...restProps}>
         {!editing ? (
    <>
    {record.pat_date}
       </>) : record.id===undefined ?
       //1===1 ?
  (
        <RangePicker onChange={setPatRange} /> //(value)=>{console.log('RANGEPICKER CHangeD', value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD'))}} />//{setPatDate} />
          ) :
          (
            <DatePicker defaultValue={moment(record.pat_date, 'YYYY-MM-DD')} onChange={setPatDate} />
              )
         }
          </td>
  )
}
else if(dataIndex==='shift'){
  return(
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
        placeholder="Select shift type"
        //defaultValue={record.diagnosis} //array expected
        //defaultValue={members}
        initialValues={children[1]}
        style={{ width: '100%' }}
        //onChange={selectChange}
      >
        
        <Option value='d'>day</Option>
        <Option value='n'>night</Option>
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
    //console.log('TYPEOF GETFULLYEARRRRRRR', typeof(todaydate.getFullYear()))
  const [form] = Form.useForm();
  const datadata = useSelector(selectTpatients);
  //console.log('vypisujem timy', datadata)
  const [data, setData] = useState([]);
  //console.log('vypisujem data ako primarny stav po rerendernuti blabla', data)
  const [dataCSV, setDataCSV] = useState([])
  // const [rerender, setRerender] = useState(false)
  //console.log(data, 'vypisujem data z editable2')
  const loading = useSelector(selectLoading);
  const [nurses, setNurses] = useState([]);
  const nur = useSelector(selectNurses);
  // setNurses([{id: '0', firstname: 'Baka', lastname: 'Loca'}])
  const [clients, setClients] = useState([]);
  const cli = useSelector(selectClients);
  const [newclient, setNewclient] = useState(false);
  // const datas=props.data
  // const [data, setData]=useState(data);
  //const data = useSelector(selectClients);
  const [editingKey, setEditingKey] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTeam, setSelectedTeam] = useState('0');
  const [datePickFrom, setDatePickFrom] = useState('');//useState(today);
  const [datePickTo, setDatePickTo] = useState('');//useState(today);
  const [patientDate, setPatientDate] = useState('');
  const [patientRange, setPatientRange] = useState([]);
  const [tcount, setTcount] = useState(0);
  let teamcount = useSelector(selectTeamCount);

  //const nurses=['Pavol Majesky', 'Zuzana Kovacova', 'Antonia Milatova']
  //const clients=['Rastislav Novomesky', 'Linda Bezakova', 'Oto White']

  const emptyteam = [{key: '0', nurse: '', client: '', shift: '', editable: true}]

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

            useEffect(() => {
                  setTcount(parseInt(teamcount, 10)) 
                  console.log('vypisujem teamcount a typ', teamcount, typeof(tcount))
                      },[teamcount]);

  function onDateSelect(_, dateString) {
    //console.log(date, dateString);
    const date=dateString.split("-");
    setSelectedDate(date)
    console.log(selectedDate, 'vypisujem selected date');
  }

  // function onDatePickFrom(_, dateString){
  //   const date=dateString.split("-");
  //   setDatePickFrom(date)
  // }

  // function onDatePickTo(_, dateString){
  //   const date=dateString.split("-");
  //   setDatePickTo(date)
  // }

  const setPatFrom = value => {
    setDatePickFrom(value.format('hh:mm:ss'))
    console.log(value.format('hh:mm:ss'), "VYPISUJEM DATEPICKFROM")
  }

  const setPatTo = value => {
    console.log(value.format('hh:mm:ss'), "VYPISUJEM DATEPICKTO")
    setDatePickTo(value.format('hh:mm:ss'))
  }

  const setPatDate = value => {
    setPatientDate(value.format('YYYY-MM-DD'))
  }

  const setPatRange = value => {
    setPatientRange([value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD')])
    console.log('vypisujem range', setPatientRange)
  }

  const chooseTeam = value =>{
    console.log('TEAM CHANGE VALUE', value, typeof(value))
    setSelectedTeam(value)
    console.log('TEAM CHANGE TO', value, typeof(value))
  }

  const title = () => {
    let optionlist = []
    for(let j=0;j<=tcount;j++){
      optionlist.push(j)
    }
    //console.log("VYPISUJEM TITLE CAS", selectedDate[0], selectedDate[1], typeof(selectedDate[0]))
    return(
      <Row justify="space-between" align="middle">
        {/* <Col>Team {selectedTeam}</Col> */}
        <Col>
        <Select defaultValue="All teams" style={{ width: 120 }} onChange={chooseTeam} disabled={editingKey===''?false:true}>
          {/* {optionlist} */}
            {optionlist.map(option => {
              if(option===0){
                return(
                  <Option value={option}>{'All teams'}</Option>
                )
              }
              else{
        return(
      <Option value={option}>{'Team '+option}</Option>)}
       })} 
          </Select>
      </Col>
        <Col>
        <DatePicker onChange={onDateSelect} defaultValue={moment(selectedDate[0].toString()+selectedDate[1].toString(), 'YYYY-MM')} format={'YYYY-MM'} picker="month"  disabled={editingKey===''?false:true}/>
            <Button type="primary" onClick={addnew} disabled={newclient} >Add shift</Button> 
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
    dispatch(fetchTeamPatients({id_team: selectedTeam, year: selectedDate[0], month: selectedDate[1]}))
    dispatch(fetchNurses())
    dispatch(fetchClients())
  },[dispatch]);

  useEffect(() => {
    dispatch(fetchTeamPatients({id_team: selectedTeam, year: selectedDate[0], month: selectedDate[1]}))
  },[selectedTeam, selectedDate]);

  useEffect(() => {
    dispatch(fetchTeamCount())
    console.log('fetching team count in ant')
  },[dispatch]);

        useEffect(() => {
          console.log('vypisujem data zo stavu po rendernuti useeffect', data)
          //props.rerender()
          setData(datadata)
              },[datadata]);
      
              useEffect(() => {
                console.log('vypisujem new nursess names', nurses)
                setNurses(nur)
                //setNurses([{id: '0', firstname: 'Baka', lastname: 'Loca'}])
                    },[nur]);

        useEffect(() => {
                console.log('vypisujem new clients names', clients)
                //props.rerender()
                setClients(cli)
                //clients=clients
                    },[cli]);

              useEffect(() => {
                console.log('new was clicked')
                //if(editingKey==='')
                if(newclient===true){
                    setData([].concat(emptyteam, data))
                    setEditingKey('0')
                }
                    },[newclient]);

                    useEffect(() => {
                      //console.log('vypisujem editing key', editingKey)
                      //props.rerender()
                      if(editingKey!==''){
                        const filtered = data.filter(item => item.key===editingKey)
                        //console.log("editujem riadocek s key", editingKey, filtered[0], data)
                      //   const filtered = data.filter(item => data.key===editingKey)
                      setDatePickFrom(filtered[0].time_from)
                      setDatePickTo(filtered[0].time_to)
                      setPatientDate(filtered[0].pat_date)
                      }
                      //clients=clients
                          },[editingKey]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      team: 'Team '+record.key,
      //members: record.members,
      ...record,
    });
    setEditingKey(record.key);
    console.log('vypisujem record', record)
  };

  const cancel = () => {
    setEditingKey('');
    setDatePickFrom('')
    setDatePickTo('')
  };

  const deleteteam = (record) => {
    dispatch(deletePatient({id: record.key}))
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      //console.log('vypisujem ROW: ', row)
      //console.log('vypisujem key v save', key, typeof(key))

      //const nurse=nurses.filter(nurse => row.nurse === data[key].nurse_id)
      //const nurse=
      //const nurse_id=nurse.id;
      //const client=clients.filter(client => client.firstname === data[key].firstname && client.lastname === data[key].lastname)
      //const client_id=client.id;

      console.log('vypisujem id clienta a nursky', row.client, row.nurse)

      if(key==='0'){
        dispatch(addPatient({nurse: row.nurse, client: row.client, pat_range: patientRange, time_from: datePickFrom, time_to: datePickTo, shift: row.shift, id_team: selectedTeam, year: selectedDate[0], month: selectedDate[1]}))
      }
      else{
      const filtered = data.filter(item => item.key===key)
      //console.log("SAVEEEEEEEEEEEEE", key, filtered[0].nurse_id, filtered[0].client_id, patientDate, datePickFrom, datePickTo, row.shift)
      dispatch(editPatient({id: filtered[0].id, nurse: filtered[0].nurse_id, client: filtered[0].client_id, pat_date: patientDate, time_from: datePickFrom, time_to: datePickTo, shift: row.shift, id_team: selectedTeam, year: selectedDate[0], month: selectedDate[1]}))
      }
      setDatePickFrom('')
      setDatePickTo('')
      
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        newData[index].pat_from=datePickFrom;
        newData[index].pat_to=datePickTo;
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
      width: '10%',
      editable: true,
      // render(text, record) {
      //   return {
      //     props: {
      //       style: { background: '#bac2bc'}//parseInt(text) > 50 ? "red" : "green" }
      //     },
      //     children: <div>{text}</div>
      //   };
      // }
    },
    {
      title: 'Client',
      dataIndex: 'client',
      width: '10%',
      editable: true,
      // render(text, record) {
      //   return {
      //     props: {
      //       style: { background: '#bac2bc'}//parseInt(text) > 50 ? "red" : "green" }
      //     },
      //     children: <div>{text}</div>
      //   };
      // }
    },
    {
      title: 'Shift date',
      dataIndex: 'pat_date',
      width: '15%',
      editable: true,
    },
    {
      title: 'Shift type',
      dataIndex: 'shift',
      width: '15%',
      editable: true,
    },
    {
      title: 'Shift from',
      dataIndex: 'time_from',
      width: '15%',
      editable: true,
    },
    {
      title: 'Shift to',
      dataIndex: 'time_to',
      width: '15%',
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
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
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
        nurses: nurses,
        clients: clients,
        setPatFrom: setPatFrom,
        setPatTo: setPatTo,
        setPatDate: setPatDate,
        setPatRange: setPatRange
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