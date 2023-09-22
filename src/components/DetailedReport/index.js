import { Table } from "antd";
import React, { useState } from "react";

const Report = ({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  
  };
  const columns = [...Object.keys(data?.[0]).map((item) => {
    return { title: item, dataIndex: item, key: item };
  })];

  return (
    <div>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => (
            <>
              {console.log(record)}
              {record?.sub && <Report data={[record.sub]  } />}
            </>
          ),
          rowExpandable: (record) =>
           {
            if(record.sub && Object.keys(record.sub).length){
              setExpandedRowKeys(record.id)
            }
           }
       
        }}
        dataSource={data}
      />
    </div>
  );
};

export default Report;
