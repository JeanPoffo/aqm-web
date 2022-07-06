import { Card } from 'antd';
import { Line } from '@ant-design/plots';

interface Graph {
  name: string,

  dateRegister: Date,

  value: number,
}

interface GraphsGases {
  graphs: Graph[],
  typeValue: string,
}

export default function GasesGraph({ graphs, typeValue }: GraphsGases) {
  return (
    <Card title="Gases">
      <Line
        data={graphs}
        padding="auto"
        xField="dateRegister"
        xAxis={{
          label: {
            formatter: (dateRegister) => new Date(String(dateRegister)).toLocaleTimeString(),
          },
        }}
        yField="value"
        yAxis={{
          label: {
            formatter: (value) => `${value} ${typeValue}`,
          },
        }}
        seriesField="name"
      />
    </Card>

  );
}
