import { Card } from 'antd';
import {
  MapContainer,
  Marker,
  TileLayer,
} from 'react-leaflet';

interface Cordinate {
  latitude: number;
  longitude: number;
}

export default function LocationMap({ latitude, longitude }: Cordinate) {
  return (
    <Card title="Localização">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: 300, zIndex: 1 }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} />
      </MapContainer>
    </Card>
  );
}
