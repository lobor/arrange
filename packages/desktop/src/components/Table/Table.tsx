import * as React from 'react';
import { Table as TableAntd } from 'antd';

interface TableProps {
  component: any;
  data: { [key: string]: any }[];
  height: number;
  onSelectedRow?: (rowSelected: any) => void;
  width: number;
}

const Table: React.FC<TableProps> = ({ onSelectedRow, width, height, data }) => {
  const columns = data.reduce<{ [key: string]: any }>((acc, el) => {
    const keys = Object.keys(el);
    for (const key of keys) {
      if (!acc[key]) {
        acc[key] = {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key: key,
          ellipsis: true
        };
      }
    }
    return acc;
  }, {});

  const [selectedRows, setSelectedRow] = React.useState<string>();
  const handleSelectRow = React.useCallback((record: any & { _id: string }) => {
    setSelectedRow(record._id);
    onSelectedRow && onSelectedRow(record);
  }, []);
  const [firstData] = data;
  React.useEffect(() => {
    if (!selectedRows && firstData) {
      console.log('handleSelectRow')
      handleSelectRow(firstData as { _id: string });
    }
  }, [handleSelectRow, selectedRows, firstData]);
  return (
    <TableAntd
      style={{ height, width }}
      size="small"
      rowKey={({ _id }: any) => _id}
      scroll={{ y: `${height - 39 - 56}px` }}
      dataSource={data}
      onRow={record => ({
        onClick: () => {
          handleSelectRow(record);
        }
      })}
      // @ts-ignore
      rowSelection={{
        columnWidth: 1,
        selections: false,
        selectedRowKeys: selectedRows ? [selectedRows] : undefined,
        hideDefaultSelections: true,
        renderCell: () => null
      }}
      columns={Object.values(columns)}
    />
  );
};

export { Table };
