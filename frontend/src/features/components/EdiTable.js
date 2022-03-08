import React, { useEffect, useState } from 'react';
import { Table, Input, Popconfirm, Button, Spin, Skeleton } from 'antd';
import { LoadingTable } from './LoadingTable';

export function EdiTable(props){
    const [data, setData] = useState(props.data);
    console.log(data, "vypisujem data z editable")
    //const [cache, setCache] = useState(data.map(item => ({ ...item })));
    const EditableCell = ({ editable, value, onChange }) => (
        <div>
          {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
          }
        </div>
      );
    const columns = [{
        title: 'Firstname',
        dataIndex: 'firstname',
        //width: '25%',
        render: (text, record) => renderColumns(text, record, 'firstname'),
      }, {
        title: 'Lastname',
        dataIndex: 'lastname',
        //width: '15%',
        render: (text, record) => renderColumns(text, record, 'lastname'),
      }, {
        title: 'Address',
        dataIndex: 'address',
        //width: '20%',
        render: (text, record) => renderColumns(text, record, 'address'),
      }, {
        title: 'Diagnosis',
        dataIndex: 'diagnosis',
        //width: '20%',
        render: (text, record) => renderColumns(text, record, 'diagnosis'),
      }, {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => save(record.key)}>Save</a>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                  : <a onClick={() => edit(record.key)}>Edit</a>
              }
            </div>
          );
        },
      }];

      const columns_nurses = [{
        title: 'Firstname',
        dataIndex: 'firstname',
        //width: '25%',
        render: (text, record) => renderColumns(text, record, 'firstname'),
      }, {
        title: 'Lastname',
        dataIndex: 'lastname',
        //width: '15%',
        render: (text, record) => renderColumns(text, record, 'lastname'),
      }, {
        title: 'Address',
        dataIndex: 'address',
        //width: '20%',
        render: (text, record) => renderColumns(text, record, 'address'),
      }, {
        title: 'Team',
        dataIndex: 'team',
        //width: '20%',
        render: (text, record) => renderColumns(text, record, 'team'),
      }, {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => save(record.key)}>Save</a>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                  : <a onClick={() => edit(record.key)}>Edit</a>
              }
            </div>
          );
        },
      }];

      const columns_attendance = [{
        title: 'Firstname',
        dataIndex: 'firstname',
        //width: '25%',
        render: (text, record) => renderColumns(text, record, 'firstname'),
      }, {
        title: 'Lastname',
        dataIndex: 'lastname',
        //width: '15%',
        render: (text, record) => renderColumns(text, record, 'lastname'),
      }, {
        title: 'Arrival to work',
        dataIndex: 'arrival',
        //width: '20%',
        render: (text, record) => renderColumns(text, record, 'arrival'),
      }, {
        title: 'Lunch from',
        dataIndex: 'lunch_from',
        //width: '20%',
        render: (text, record) => renderColumns(text, record, 'lunch_from'),
      }, {
        title: 'Lunch to',
        dataIndex: 'lunch_to',
        //width: '20%',
        render: (text, record) => renderColumns(text, record, 'lunch_to'),
      }, {
        title: 'Departure',
        dataIndex: 'departure',
        //width: '20%',
        render: (text, record) => renderColumns(text, record, 'departure'),
      }, {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => save(record.key)}>Save</a>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                  : <a onClick={() => edit(record.key)}>Edit</a>
              }
            </div>
          );
        },
      }];

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    //     getCheckboxProps: record => {
    //       const rowIndex = data.findIndex((item) => item.key === record.key);
    // return {
    //   disabled: rowIndex > 5 //enable first 6 rows only
    // };
    //     },
        //hideSelectAll: true,
      };

let cache=data.map(item => ({ ...item })); //?

  function renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => handleChange(value, record.key, column)}
      />
    );
  }
  function handleChange(value, key, column) {
    //const newData = [...this.state.data];
    const newData = [...data];
    const target = newData.filter(item => key === item.key)[0];
    console.log(target)
    if (target) {
      target[column] = value;
      //this.setState({ data: newData });
      setData(newData);
    }
  }
  function edit(key) {
    //const newData = [...this.state.data];
    const newData = [...data];
    let target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      //this.setState({ data: newData });
      setData(newData);
    }
  }
  function save(key) {
    //const newData = [...this.state.data];
    const newData = [...data];
    let target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      //this.setState({ data: newData });
      setData(newData);
      //this.cacheData = newData.map(item => ({ ...item }));
      cache = newData.map(item => ({ ...item }));
      //setCache(newData.map(item => ({ ...item })))
    }
  }
  function cancel(key) {
    //const newData = [...this.state.data];
    const newData = [...data];
    let target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, cache.filter(item => key === item.key)[0]);
      delete target.editable;
      //this.setState({ data: newData });
      setData(newData);
    }
  }
    if(props.type==='attendance'){
      return <Table bordered rowSelection={rowSelection} dataSource={data} columns={columns_attendance} style={{width: '100%'}}
                  title={props.title} footer={() => 'Icons for printing'}/>;
    }
    else if(props.type==='nurses'){
      return <Table bordered rowSelection={rowSelection} dataSource={data} columns={columns_nurses} style={{width: '100%'}}
                  title={props.title} footer={() => 'Icons for printing'}/>;
    }else{
      if(props.loading===false){
    return <Table bordered rowSelection={rowSelection} dataSource={data} columns={columns} style={{width: '100%'}} 
                  title={props.title} footer={() => 'Icons for printing'}/>;
    }else{
      return <LoadingTable columns={columns} />;
    }
    }
}

//ReactDOM.render(<EditableTable />, mountNode);

// .editable-row-operations a {
//   margin-right: 8px;
// }