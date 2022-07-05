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
    render: (dateRegister) => new Date(String(dateRegister).substring(0, 19)).toLocaleDateString(),
  },
  {
    title: 'Hora Registro',
    dataIndex: 'dateRegister',
    key: 'dateRegisterHour',
    render: (dateRegister) => new Date(String(dateRegister).substring(0, 19)).toLocaleTimeString(),
  },
  {
    title: 'Temperatura',
    dataIndex: 'temperature',
    key: 'temperature',
    render: (temperature) => `${Number(temperature).toFixed(2)} °C`,
  },
  {
    title: 'Humidade',
    dataIndex: 'humidity',
    key: 'humidity',
    render: (humidity) => `${Number(humidity).toFixed(2)} %`,
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
