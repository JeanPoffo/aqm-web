import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

interface Gas {
  id: string;

  dateRegister: Date;

  particulateMaterialTwoFive: number;

  carbonMonoxide: number;

  ozone: number;
}

interface Gases {
  gases: Gas[];
}

const columns: ColumnsType<Gas> = [
  {
    title: 'Hora Registro',
    dataIndex: 'dateRegister',
    key: 'dateRegisterHour',
    render: (dateRegister) => new Date(String(dateRegister)).toLocaleTimeString(),
  },
  {
    title: 'PM2.5 (mg/m³)',
    dataIndex: 'particulateMaterialTwoFive',
    key: 'particulateMaterialTwoFive',
    render: (particulateMaterialTwoFive) => Number(particulateMaterialTwoFive).toFixed(4),
  },
  {
    title: 'CO (ppm)',
    dataIndex: 'carbonMonoxide',
    key: 'carbonMonoxide',
    render: (carbonMonoxide) => Number(carbonMonoxide).toFixed(4),
  },
  {
    title: 'O₃ (mg/m³)',
    dataIndex: 'ozone',
    key: 'ozone',
    render: (ozone) => Number(ozone).toFixed(4),
  },
];

export default function GasesTable({ gases }: Gases) {
  return (
    <Card title="Gases">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={gases}
        pagination={{ pageSize: 5 }}
      />
    </Card>

  );
}
