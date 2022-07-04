import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

interface ConamaData {
  id: number;

  particulateMaterialTwoFive: number;

  carbonMonoxide: number;

  ozone: number;
}

interface Conamas {
  conamas: ConamaData[],
}

const columns: ColumnsType<ConamaData> = [
  {
    title: 'PM2.5',
    dataIndex: 'particulateMaterialTwoFive',
    key: 'particulateMaterialTwoFive',
  },
  {
    title: 'CO',
    dataIndex: 'carbonMonoxide',
    key: 'carbonMonoxide',
  },
  {
    title: 'O₃',
    dataIndex: 'ozone',
    key: 'ozone',
  },
];

export default function GasesTable({ conamas }: Conamas) {
  return (
    <Card title="CONAMA">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={conamas}
        pagination={{ hideOnSinglePage: true }}
      />
    </Card>
  );
}
