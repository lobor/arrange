import * as React from 'react';
import { Table as TableAntd } from 'antd';

interface TableProps {
  component: any;
  width: number;
  height: number;
  data: { [key: string]: any }[];
}

const Table: React.FC<TableProps> = ({ width, height, data }) => {
  const columns = (data || []).reduce<{ [key: string]: any }>((acc, el) => {
    const keys = Object.keys(el);
    for (const key of keys) {
      if (!acc[key]) {
        acc[key] = {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key: key
        };
      }
    }
    return acc;
  }, {});
  // console.log(columns);
  return (
    <TableAntd
      style={{ width }}
      size="small"
      scroll={{ y: `${height - 39 - 56}px` }}
      dataSource={data}
      columns={Object.values(columns)}
    />
  );
};

export { Table };
