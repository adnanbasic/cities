import React from 'react';
import GoogleMapReact from 'google-map-react';
 
function Map({ longitude, latitude, markerContent }) {
    
    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            title: markerContent
        });
        return marker;
    };
    
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          defaultCenter={{
            lat: latitude,
            lng: longitude,
          }}
          defaultZoom={10}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        >
            
        </GoogleMapReact>
      </div>
    );
}
 
export default Map;