import React, { useEffect, useState } from 'react';
import { Table, Input, Popconfirm, Button } from 'antd';

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }



    

//class EditableTable extends React.Component {
export function EdiTable(props){
    const [data, setData] = useState(props.data);
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
//   constructor(props) {
//     super(props);
//     this.columns = [{
//       title: 'name',
//       dataIndex: 'name',
//       width: '25%',
//       render: (text, record) => this.renderColumns(text, record, 'name'),
//     }, {
//       title: 'age',
//       dataIndex: 'age',
//       width: '15%',
//       render: (text, record) => this.renderColumns(text, record, 'age'),
//     }, {
//       title: 'address',
//       dataIndex: 'address',
//       width: '40%',
//       render: (text, record) => this.renderColumns(text, record, 'address'),
//     }, {
//       title: 'operation',
//       dataIndex: 'operation',
//       render: (text, record) => {
//         const { editable } = record;
//         return (
//           <div className="editable-row-operations">
//             {
//               editable ?
//                 <span>
//                   <a onClick={() => this.save(record.key)}>Save</a>
//                   <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
//                     <a>Cancel</a>
//                   </Popconfirm>
//                 </span>
//                 : <a onClick={() => this.edit(record.key)}>Edit</a>
//             }
//           </div>
//         );
//       },
//     }];
//     this.state = { data };
//     this.cacheData = data.map(item => ({ ...item }));
//   }
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

  // const titlebutton = () => {
  //   return(
  //     <Button type="primary" >Add patient</Button>
  //   )
  // }
  //render() {
    return <Table bordered rowSelection={rowSelection} dataSource={data} columns={columns} 
                  title={props.title} footer={() => 'Icons for printing'} style={{width: '100%'}} />;
  //}
}

//ReactDOM.render(<EditableTable />, mountNode);

// .editable-row-operations a {
//   margin-right: 8px;
// }