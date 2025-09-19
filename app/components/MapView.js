'use client'; 

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// İkon düzeltmesi aynı kalıyor.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Artık "businesses" prop'unu kullanıyoruz.
export default function MapView({ businesses = [] }) {
  const center = [40.1453, 26.4142]; 

  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* BU BÖLÜMÜ AKTİF HALE GETİRDİK */}
      {/* Gelen her bir mekan için bir Marker (iğne) oluşturuyoruz. */}
      {businesses.map(b => (
        <Marker key={b._id} position={[b.location.coordinates[1], b.location.coordinates[0]]}>
          <Popup>
            <b>{b.name}</b><br/>{b.category}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}