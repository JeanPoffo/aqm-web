import { Card } from 'antd';
import { Line } from '@ant-design/plots';
import { useMemo } from 'react';

interface Graph {
  name: string,

  dateRegister: Date,

  value: number,
}

interface LineGraphData {
  title: string;
  graphs: Graph[],
  typeValue: string,
}

export default function LineGraph({ title, graphs, typeValue }: LineGraphData) {
  const data = useMemo(() => graphs.flatMap(({ name, dateRegister, value }) => ({
    name,
    dateRegister: `${new Date(String(dateRegister)).toLocaleString().substring(0, 5)} ${new Date(String(dateRegister)).toLocaleString().substring(10, 13)}h`,
    value,
  })), [graphs]);

  return (
    <Card title={title}>
      <Line
        data={data}
        padding="auto"
        xField="dateRegister"
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
