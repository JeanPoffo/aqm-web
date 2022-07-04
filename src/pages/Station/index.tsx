import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import Dashboard from '../../components/Dashboard';

import api from '../../services/api';

interface Station {
  id: string;

  name: string;

  latitude: number;

  longitude: number;

  isActive: boolean;
}

const columns: ColumnsType<Station> = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'carbonMonoxide',
  },
  {
    title: 'Latitude',
    dataIndex: 'latitude',
    key: 'latitude',
  },
  {
    title: 'Longitude',
    dataIndex: 'longitude',
    key: 'longitude',
  },
  {
    title: 'Ativo?',
    dataIndex: 'isActive',
    key: 'isActive',
  },
];

export default function DataDashboard() {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    api.get<Station[]>('station').then((response) => {
      setStations(response.data);
    });
  }, []);

  return (
    <Dashboard>
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={stations}
          pagination={{ hideOnSinglePage: true }}
        />
      </div>
    </Dashboard>
  );
}
