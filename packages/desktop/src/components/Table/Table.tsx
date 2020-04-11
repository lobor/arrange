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

  const handleSelectRow = React.useCallback(
    (record: any & { id: string }) => {
      const id = (record as { id: string }).id;
      setSelectedRow(id);
      onSelectedRow && onSelectedRow(record);
    },
    [onSelectedRow]
  );
  const [selectedRows, setSelectedRow] = React.useState<string>();
  React.useEffect(() => {
    if (!selectedRows && data[0]) {
      handleSelectRow(data[0] as { id: string });
    }
  }, [handleSelectRow, selectedRows, data]);
  return (
    <TableAntd
      style={{ width }}
      size="small"
      rowKey={({ id }: any) => id}
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
