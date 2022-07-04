import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

interface Weather {
  id: string;

  dateRegister: Date;

  temperature: number;

  humidity: number;
}

interface Weathers {
  weathers: Weather[];
}

const columns: ColumnsType<Weather> = [
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
    title: 'Temperatura',
    dataIndex: 'temperature',
    key: 'temperature',
    render: (temperature: number) => `${temperature} °C`,
  },
  {
    title: 'Humidade',
    dataIndex: 'humidity',
    key: 'humidity',
    render: (humidity: number) => `${humidity} %`,
  },
];

export default function WeatherTable({ weathers }: Weathers) {
  return (
    <Card title="Temperatura e Humidade">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={weathers}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}
