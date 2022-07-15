import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Button,
  Divider,
  Space,
  Table,
  Tag,
  Popconfirm,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { DownloadOutlined } from '@ant-design/icons';
import Dashboard from '../../components/Dashboard';
import StationRegister from '../../components/StationRegister';

import api from '../../services/api';

interface Station {
  id: string;

  name: string;

  latitude: number;

  longitude: number;

  isActive: boolean;
}

export default function DataDashboard() {
  const [stations, setStations] = useState<Station[]>([]);
  const [showStation, setShowStation] = useState<boolean>(false);

  const updateStations = useCallback(() => {
    api.get<Station[]>('station').then((response) => {
      setStations(response.data);
    });
  }, []);

  const deleteStation = useCallback((id: String) => {
    api.delete(`station/${id}`).then(() => {
      updateStations();
    });
  }, []);

  useEffect(() => {
    updateStations();
  }, []);

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
      render: (_, { isActive }) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Sim' : 'Não'}
        </Tag>
      ),
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, { id }) => (
        <Space size="middle">
          <Popconfirm
            title="Você realmente quer excluir esta estação?"
            onConfirm={() => deleteStation(id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="primary" danger>Excluir</Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  return (
    <Dashboard>
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      >
        <StationRegister
          visible={showStation}
          setVisible={setShowStation}
          callback={updateStations}
        />
        <Divider orientation="left"><h2>Estações</h2></Divider>

        <Space style={{ marginBottom: '16px' }}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            onClick={() => setShowStation(true)}
          >
            Adicionar
          </Button>
        </Space>

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
