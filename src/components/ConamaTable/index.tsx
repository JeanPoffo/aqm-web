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
    title: 'PM2.5 (mg/m³) (média de 24h)',
    dataIndex: 'particulateMaterialTwoFive',
    key: 'particulateMaterialTwoFive',
    render: (particulateMaterialTwoFive) => Number(particulateMaterialTwoFive).toFixed(4),
  },
  {
    title: 'CO (ppm) (média móvel de 8h)',
    dataIndex: 'carbonMonoxide',
    key: 'carbonMonoxide',
    render: (carbonMonoxide) => Number(carbonMonoxide).toFixed(4),
  },
  {
    title: 'O₃ (mg/m³) (média móvel de 8h)',
    dataIndex: 'ozone',
    key: 'ozone',
    render: (ozone) => Number(ozone).toFixed(4),
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
