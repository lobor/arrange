import * as React from 'react';
import { Table as TableAntd } from 'antd';
import styled from 'styled-components';

const TableStyled = styled(TableAntd)`
  .ant-table-tbody {
    & > tr.ant-table-row-selected {
      & > td {
        background-color: #c4d7ed;
      }
    }
  }
`;

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
      if (!acc[key] && typeof el[key] !== 'object' && !Array.isArray(el[key])) {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [firstData] = data;
  React.useEffect(() => {
    if (!selectedRows && firstData) {
      handleSelectRow(firstData as { _id: string });
    }
  }, [handleSelectRow, selectedRows, firstData]);
  return (
    <TableStyled
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
