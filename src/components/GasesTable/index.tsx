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
    render: (dateRegister: Date) => new Date(dateRegister).toLocaleDateString(),
  },
  {
    title: 'Hora Registro',
    dataIndex: 'dateRegister',
    key: 'dateRegisterHour',
    render: (dateRegister: Date) => new Date(dateRegister).toLocaleTimeString(),
  },
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
