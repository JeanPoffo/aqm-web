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
    title: 'Data Registro',
    dataIndex: 'dateRegister',
    key: 'dateRegisterDate',
    render: (dateRegister) => new Date(String(dateRegister).substring(0, 19)).toLocaleDateString(),
  },
  {
    title: 'Hora Registro',
    dataIndex: 'dateRegister',
    key: 'dateRegisterHour',
    render: (dateRegister) => new Date(String(dateRegister).substring(0, 19)).toLocaleTimeString(),
  },
  {
    title: 'PM2.5',
    dataIndex: 'particulateMaterialTwoFive',
    key: 'particulateMaterialTwoFive',
    render: (particulateMaterialTwoFive) => Number(particulateMaterialTwoFive).toFixed(4),
  },
  {
    title: 'CO',
    dataIndex: 'carbonMonoxide',
    key: 'carbonMonoxide',
    render: (carbonMonoxide) => Number(carbonMonoxide).toFixed(4),
  },
  {
    title: 'O₃',
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
