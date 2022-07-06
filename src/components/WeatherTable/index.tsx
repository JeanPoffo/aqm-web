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
    title: 'Data do Registro',
    dataIndex: 'dateRegister',
    key: 'dateRegister',
    render: (dateRegister) => new Date(String(dateRegister)).toLocaleString(),
  },
  {
    title: 'Temperatura',
    dataIndex: 'temperature',
    key: 'temperature',
    render: (temperature) => `${Number(temperature).toFixed(2)} °C`,
  },
  {
    title: 'Umidade',
    dataIndex: 'humidity',
    key: 'humidity',
    render: (humidity) => `${Number(humidity).toFixed(2)} %`,
  },
];

export default function WeatherTable({ weathers }: Weathers) {
  return (
    <Card title="Temperatura e Umidade">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={weathers}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}
