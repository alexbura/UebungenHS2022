import React from 'react';
import "./App.css";
import "leaflet/dist/leaflet.css";


import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'


function App() {

  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

return (
  <MapContainer center={[47, 8.05]} zoom={8} scrollWheelZoom={true}>

  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />

  <Circle center={[46.96887277, 7.268042402]} radius={50000}></Circle>
  <Circle center={[47.36607556, 7.966750757]} radius={50000}></Circle>
  <Circle center={[47.55201943, 8.228391684]} radius={50000}></Circle>
  <Circle center={[47.60145537, 8.182823992]} radius={50000}></Circle>

  <Marker position={[46.96887277, 7.268042402]}>
    <Popup>
      <b>Kernkraftwerk Mühleberg</b><br/>Mühleberg (BE)
    </Popup>
  </Marker>
  <Marker position={[47.36607556, 7.966750757]}>
    <Popup>
      <b>Kernkraftwerk Gösgen</b><br/>Däniken (SO)
    </Popup>
  </Marker>
  <Marker position={[47.55201943, 8.228391684]}>
    <Popup>
      <b>Kernkraftwerk Beznau</b><br/>Döttingen (AG)
    </Popup>
  </Marker>
  <Marker position={[47.60145537, 8.182823992]}>
    <Popup>
      <b>Kernkraftwerk Leibstadt</b><br/>Leibstadt (AG)
    </Popup>
  </Marker>

</MapContainer>
  );
}

export default App;