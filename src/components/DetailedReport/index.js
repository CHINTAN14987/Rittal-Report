import { Table } from "antd";
import React, { useState } from "react";

const Report = ({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
const exclude=["sub" ]
  const columns = [
    ...Object.keys(data?.[0]).filter((item)=>item.indexOf(exclude) ===-1).map((item) => {
     switch(item){
      case "Business Name":
        return {
          title: item,
          dataIndex: item,
          key: item,
          render: (text) => (
            <a href={text} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          ),
        };
        case "Status":
          return {
            title: item,
            dataIndex: item,
            key: item,
            render: (text) => (
              <div style={{background: text==="No Response" && "#bed9e5", height:"100%", width:"100%"}}>
                {text}
              </div>
            ),
          };
      default:
        return { title: item, dataIndex: item, key: item };
     }
    }),
  ];

  return (
    <div>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => (
            <>
              {console.log(record)}
              {record?.sub && <Report data={[record.sub]} />}
            </>
          ),
          rowExpandable: (record) => record.sub && Object.keys(record.sub).length
        }}
        dataSource={data}
      />
    </div>
  );
};

export default Report;
