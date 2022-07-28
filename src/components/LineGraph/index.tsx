import { Card } from 'antd';
import { Line } from '@ant-design/plots';
import { useCallback, useMemo } from 'react';

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
  const getDateOrder = useCallback((date: Date) => {
    const localeDate = new Date(String(date)).toLocaleString();
    const items = [
      localeDate.substring(6, 10),
      localeDate.substring(3, 5),
      localeDate.substring(0, 2),
      localeDate.substring(11, 13),
    ];

    return Number(items.join(''));
  }, []);

  const data = useMemo(() => graphs.flatMap(({ name, dateRegister, value }) => ({
    name,
    dateOrder: getDateOrder(dateRegister),
    dateRegister: `${new Date(String(dateRegister)).toLocaleString().substring(0, 5)} ${new Date(String(dateRegister)).toLocaleString().substring(10, 13)}h`,
    value,
  })).sort((a, b) => a.dateOrder - b.dateOrder), [graphs]);

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
