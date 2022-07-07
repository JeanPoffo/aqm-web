import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Divider,
  Space,
  DatePicker,
  Select,
  Spin,
} from 'antd';
import moment, { Moment } from 'moment';

import Dashboard from '../../components/Dashboard';
import ConamaTable from '../../components/ConamaTable';
import WeatherTable from '../../components/WeatherTable';
import GasesTable from '../../components/GasesTable';
import LineGraph from '../../components/LineGraph';
import LocationMap from '../../components/LocationMap';

import api from '../../services/api';

const { Option } = Select;

interface Data {
  id: string;

  dateRegister: Date;

  particulateMaterialTwoFive: number;

  carbonMonoxide: number;

  ozone: number;

  temperature: number;

  humidity: number;
}

interface Station {
  id: string;

  name: string;

  latitude: number;

  longitude: number;

  isActive: boolean;
}

interface Graph {
  name: string,

  dateRegister: Date,

  value: number,
}

interface Graphs {

  particulateMaterialTwoFive: Graph[],

  carbonMonoxide: Graph[],

  ozone: Graph[],

  temperature: Graph[],

  humidity: Graph[],
}

interface DataDashoard {

  station: Station,

  data: Data[],

  graphs: Graphs,

  conama: {
    particulateMaterialTwoFive: number,

    carbonMonoxide: number,

    ozone: number,
  }
}

export default function DataDashboard() {
  const [dataDashboard, setDataDashboard] = useState<DataDashoard[]>([]);
  const [date, setDate] = useState<Moment | null>(moment());
  const [loadinDate, setLoadingDate] = useState<boolean>(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>();

  useEffect(() => {
    api.get<Station[]>('station').then((response) => {
      setStations(response.data);
    });
  }, []);

  useEffect(() => {
    setLoadingDate(true);

    const params = {
      startDate: moment(date)
        .subtract(1, 'day')
        .toISOString(),
      endDate: moment(date)
        .toISOString(),
    };

    if (selectedStation) {
      Object.assign(params, { stationId: selectedStation.id });
    }

    api.get<DataDashoard[]>('dashboard', { params }).then((response) => {
      setDataDashboard(response.data);
    }).finally(() => setLoadingDate(false));
  }, [date, selectedStation]);

  const onChangeSelectStation = useCallback((id: string) => {
    const station = stations.find((actualStation) => actualStation.id === id);

    if (station) {
      setSelectedStation(station);
    } else {
      setSelectedStation(null);
    }
  }, [stations]);

  return (
    <Dashboard>
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      >
        <Space>
          Data:
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format="DD/MM/YYYY HH:mm"
            allowClear={false}
            value={date}
            onChange={setDate}
          />
          Estação:
          <Select defaultValue="todas" style={{ width: 200 }} onChange={onChangeSelectStation}>
            <Option value="todas">Todos</Option>
            {stations.map((actualStation) => (
              <Option key={actualStation.id} value={actualStation.id}>{actualStation.name}</Option>
            ))}
          </Select>
          <Spin size="small" spinning={loadinDate} style={{ marginLeft: '10px' }} />
        </Space>

        {dataDashboard.length > 0 && dataDashboard.map(({
          station: {
            id,
            name,
            latitude,
            longitude,
          },
          data,
          graphs,
          conama: {
            carbonMonoxide,
            ozone,
            particulateMaterialTwoFive,
          },
        }) => (
          <div key={id}>
            <Divider orientation="left"><h2>{name}</h2></Divider>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
              gridColumnGap: '10px',
              gridRowGap: '10px',
            }}
            >
              <div style={{ gridColumn: 'span 6' }}>
                <ConamaTable
                  conamas={[{
                    id: 1,
                    carbonMonoxide,
                    ozone,
                    particulateMaterialTwoFive,
                  }]}
                />
              </div>

              <div style={{ gridColumn: 'span 3' }}>
                <WeatherTable weathers={data} />
              </div>

              <div style={{ gridColumn: 'span 3' }}>
                <GasesTable gases={data} />
              </div>

              <div style={{ gridColumn: 'span 3' }}>
                <LineGraph
                  title="Gases"
                  graphs={[...graphs.carbonMonoxide, ...graphs.ozone]}
                  typeValue="ppm"
                />
              </div>

              <div style={{ gridColumn: 'span 3' }}>
                <LineGraph
                  title="Material Particulado"
                  graphs={[...graphs.particulateMaterialTwoFive]}
                  typeValue="mg/m³"
                />
              </div>

              <div style={{ gridColumn: 'span 3' }}>
                <LineGraph
                  title="Temperatura"
                  graphs={[...graphs.temperature]}
                  typeValue="°C"
                />
              </div>

              <div style={{ gridColumn: 'span 3' }}>
                <LineGraph
                  title="Umidade"
                  graphs={[...graphs.humidity]}
                  typeValue="%"
                />
              </div>

              <div style={{ gridColumn: 'span 6' }}>
                <LocationMap
                  latitude={latitude}
                  longitude={longitude}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}
