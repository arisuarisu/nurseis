import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select, Tag, Row, Col, Button, Avatar, DatePicker } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
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
    selectTeamCount,
    fetchCalendar,
    selectCalendar
  } from '../pages/teamsSlice';

import { CSVLink } from "react-csv";
import moment from 'moment';
const { Option } = Select;

const headers_teams = [
  { label: "Teams", key: "teams" },
  // { label: "", key: "teams" },
  // { label: "Teams", key: "teams" },
  { label: "Nurses", key: "nurses" }
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
...restProps
}) => {
const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;


// if(dataIndex==='nurse'){
//   return(
//     <td {...restProps} >
//     {editing ? (
//       <Form.Item
//         name={dataIndex}
//         style={{
//           margin: 0,
//         }}
//         rules={[
//           {
//             required: true,
//             message: `Please Input ${title}!`,
//           },
//         ]}
//       >
//         {inputNode}
//       </Form.Item>
//     ) : (
//       children
//     )}
//   </td>
//   )
// }
// else{
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
);//}
};

export function Organizer2 (props) {

  const getDaysInMonth = (year, month) => {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
   return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
  };

    const dispatch = useDispatch();
      //const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const todaydate = new Date();
    const [activeDate, setActiveDate] = useState(todaydate);
    const today = [todaydate.getFullYear(), todaydate.getMonth()+1]
  const [form] = Form.useForm();
  const datadata = useSelector(selectCalendar);
  console.log('vypisujem timy', datadata)
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
  const [selectedTeam, setSelectedTeam] = useState('1');
  const [datePickFrom, setDatePickFrom] = useState(today);
  const [datePickTo, setDatePickTo] = useState(today);
  const [tcount, setTcount] = useState(0);
  console.log('vypisujem team count', tcount)
  const teamcount = useSelector(selectTeamCount)

  const [daycount, setDaycount] = useState(31);
  const [monthname, setMonthname] = useState(months[today[1]]);
  const [monthnumber, setMonthnumber] = useState(today[1]);
  const [yearnumber, setYearnumber] = useState(today[0]);

  //const nurses=['Pavol Majesky', 'Zuzana Kovacova', 'Antonia Milatova']
  //const clients=['Rastislav Novomesky', 'Linda Bezakova', 'Oto White']

  const emptyteam = [{key: '0', nurse: '', client: '', pat_date: '', time_from: '', time_to: '', editable: true}]

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

            // useEffect(() => {
            //       setTcount(teamcount) 
            //           },[teamcount]);

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

  // const setPatFrom = value => {
  //   setDatePickFrom(value.format('YYYY-MM-DD'))
  //   //console.log(value.format('YYYY-MM-DD'), "VYPISUJEM DATEPICKFROM")
  // }

  // const setPatTo = value => {
  //   setDatePickTo(value.format('YYYY-MM-DD'))
  // }

  // const chooseTeam = value =>{
  //   selectedTeam(value)
  // }

  // const getDate = (yearmonth) => { //prerobit aj na konkretny datum
  //   const dateObj = new Date(yearmonth);
  //   const yearmonthsplit = yearmonth.split("-");
  //   const monthname = dateObj.toLocaleString("en-US", { month: "long" });

  //   //return {monthname: monthname, monthnumber: yearmonthsplit[1], yearnumber: yearmonthsplit[0], daycount: 0 }
  //   // setMonthname(monthname)
  //   // setMonthnumber(yearmonthsplit[1])
  //   // setYearnumber(yearmonthsplit[0])
  //   // setDaycount()
  // }

  const leftIconClick = () => {
    const datedate = new Date
    datedate.setDate(activeDate.getDate() + 7);
    setActiveDate(datedate)
    console.log('vypisujem active date', datedate)
  }

  const rightIconClick = () => {
    console.log('kliknem prave tlacitko')
  }

  const title = () => {
    //let optionlist = []
    // for(let j=0;j>tcount;j++){
    //   optionlist.push(<Option value={j}>{j}</Option>)
    // }
    return(
      <Row justify="space-between" align="middle">
        {/* <Col>Team {selectedTeam}</Col> */}
        <Col>
          {/* <Select defaultValue="lucy" style={{ width: 120 }} onChange={chooseTeam}>
            {optionlist}
          </Select> */}
          {monthname+' '+yearnumber}
      </Col>
        <Col>
        {/* <DatePicker onChange={onDateSelect} picker="month" /> */}
            {/* <Button type="primary" onClick={addnew} disabled={newclient} >Add shift</Button>  */}
            <LeftOutlined onClick={leftIconClick}/>
            <RightOutlined onClick={rightIconClick}/>
        </Col>
      </Row>
    )
  }

  // const addnew = () => {
  //   setNewclient(true);
  // }

  // const cancelnew = () => {
  //   setNewclient(false);
  // }

  useEffect(() => {
    // dispatch(fetchTeamPatients({id_team: selectedTeam, year: selectedDate[0], month: selectedDate[1]}))
    // dispatch(fetchNurses)
    // dispatch(fetchClients)
    dispatch(fetchCalendar)
  },[dispatch]);

        useEffect(() => {
          console.log('vypisujem data zo stavu po rendernuti useeffect', data)
          //props.rerender()
          setData(datadata)
              },[datadata]);
      
              useEffect(() => {
                console.log('vypisujem new nursess names', nurses)
                //setNurses(nur)
                setNurses([{id: '0', firstname: 'Baka', lastname: 'Loca'}])
                    },[nur]);

        useEffect(() => {
                console.log('vypisujem new clients names', clients)
                //props.rerender()
                setClients(cli)
                //clients=clients
                    },[cli]);

              // useEffect(() => {
              //   console.log('new was clicked')
              //   //if(editingKey==='')
              //   if(newclient===true){
              //       setData([].concat(emptyteam, data))
              //       setEditingKey('0')
              //   }
              //       },[newclient]);

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

      //console.log('vypisujem id clienta a nursky', row.client, row.nurse)

      // if(key==='0'){
      //   dispatch(addPatient({nurse: data[key].nurse_id, client: data[key].client_id, pat_from: row.pat_from, pat_to: row.pat_to}))
      // }
      // else{
      // dispatch(editPatient({id: key, nurse: data[key].nurse_id, client: data[key].client_id, pat_from: row.pat_from, pat_to: row.pat_to}))
      // }
      // setDatePickFrom('')
      // setDatePickTo('')
      
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

  let columns_teams = [
    {
      title: 'Team',
      dataIndex: 'team',
      width: '20%',
      editable: false,
    },
    {
      title: 'Nurses',
      dataIndex: 'nurse',
      width: '20%',
      editable: false,
    },
  ];
  // for(let j=1;j<=daycount;j++){
    for(let j=1;j<=14;j++){
    console.log('vypisujem daycount', daycount)
    columns_teams.push({
        title: j.toString(),
        dataIndex: j.toString(),
        width: '5%',
        editable: true
    })
    //console.log('vypisujem loop v columns', j)
  }

  //console.log('vypisujem column array', columns_teams)

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
        //setPatFrom: setPatFrom
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