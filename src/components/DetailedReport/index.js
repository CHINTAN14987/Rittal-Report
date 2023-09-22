import { Table } from 'antd';
import React from 'react'

const Report = ({data}) => {
console.log(data)
    const columns = 
      Object.keys(data?.[0]).map((item)=>{return {"title":item, "dataIndex":item, "key":item}})
      
console.log(columns, "hello")
  return (
    <div>
         <Table
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
          }}
        >
          {record.description}
        </p>
      ),
      rowExpandable: (record) => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />
    </div>
  )
}

export default Report