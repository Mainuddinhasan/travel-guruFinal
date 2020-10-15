import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import {API_KEY} from './config' 
const containerStyle = {
  width: '400px',
  height: '400px'
};
 
const center = {
  lat: 22.330370,
  lng: 91.832630
};
 
function Map() {
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <LoadScript
    googleMapsApiKey="AIzaSyCAGzpueG0lrkr83uUm_Zz_8vW_bBKwaVU"
      // {API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(Map)
