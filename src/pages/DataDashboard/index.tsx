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
} from 'antd';
import moment, { Moment } from 'moment';

import Dashboard from '../../components/Dashboard';
import WeatherTable from '../../components/WeatherTable';
import GasesTable from '../../components/GasesTable';
import ConamaTable from '../../components/ConamaTable';
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

interface DataDashoard {

  station: Station,

  data: Data[],

  conama: {
    particulateMaterialTwoFive: number,

    carbonMonoxide: number,

    ozone: number,
  }
}

export default function DataDashboard() {
  const [dataDashboard, setDataDashboard] = useState<DataDashoard[]>([]);
  const [date, setDate] = useState<Moment | null>(moment());
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>();

  useEffect(() => {
    api.get<Station[]>('station').then((response) => {
      setStations(response.data);
    });
  }, []);

  useEffect(() => {
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
    });
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
        display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'column',
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
        </Space>

        {dataDashboard.length > 0 && dataDashboard.map(({
          station: {
            id,
            name,
            latitude,
            longitude,
          },
          data,
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
              gridTemplateColumns: '2fr 2fr',
              gridColumnGap: '10px',
              gridRowGap: '10px',
            }}
            >
              <ConamaTable
                conamas={[{
                  id: 1,
                  carbonMonoxide,
                  ozone,
                  particulateMaterialTwoFive,
                }]}
              />
              <LocationMap
                latitude={latitude}
                longitude={longitude}
              />
              <WeatherTable weathers={data} />
              <GasesTable gases={data} />
            </div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}
