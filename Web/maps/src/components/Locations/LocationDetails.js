import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import * as LocationsService from 'services/LocationsService';

import Map from 'components/Shared/Map/Map';

function LocationDetails(props) {
  const [locationId] = useState(props.match.params.id);
  const [location, setLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  let history = useHistory();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      setIsLoadingLocation(true);
      const response = await LocationsService.getLocation(locationId);
      setLocation(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const renderLocation = () => {
    if (isLoadingLocation) {
      // TODO: Loading component
    } else {
      return (
        <div style={{ width: '100%' }}>
          <div>Name: {location.name}</div>
          <div>City: {location.city}</div>
          <div>Longitude: {location.longitude}</div>
          <div>Latitude: {location.latitude}</div>
          <hr />
          <Button
            variant="primary"
            type="button"
            onClick={() => history.push(`/update/${locationId}`)}
          >
            Edit
          </Button>
          <hr />
          <Map
            longitude={location.longitude}
            latitude={location.latitude}
            markerContent={'Mostar'}
          ></Map>
          <hr />
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Location Details</h1>
        {renderLocation()}
      </div>
    </div>
  );
}
export default LocationDetails;
