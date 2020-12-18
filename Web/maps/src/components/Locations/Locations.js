import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as LocationsService from 'services/LocationsService';

import Table from 'components/Shared/Table/Table';
import CustomModal from 'components/Shared/CustomModal/CustomModal';

function Locations() {
  const [locations, setLocations] = useState(null);
  const [locationForDelete, setLocationForDelete] = useState(null);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  let history = useHistory();

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      setIsLoadingLocations(true);
      const response = await LocationsService.getLocations();
      setLocations(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  const getTableColumns = () => {
    return [
      {
        displayValue: 'Name',
        prop: 'name',
        renderer: row => row.name,
      },
      {
        displayValue: 'Address',
        prop: 'address',
        renderer: row => row.address,
      },
      {
        displayValue: 'City',
        prop: 'city',
        renderer: row => row.city,
      },
      {
        displayValue: 'Longitude',
        prop: 'longitude',
        renderer: row => row.longitude,
      },
      {
        displayValue: 'Latitude',
        prop: 'latitude',
        renderer: row => row.latitude,
      },
      {
        displayValue: 'Actions',
        prop: 'actions',
        renderer: row => {
          return (
            <button
              type="button"
              className="btn btn-danger"
              onClick={e => handleDeleteClick(e, row)}
            >
              Delete
            </button>
          );
        },
      },
    ];
  };

  const renderDeleteModal = () => {
    if (locationForDelete) {
      return (
        <CustomModal
          title={'Delete Location'}
          content={`Are you sure to delete location "${locationForDelete.name}"`}
          button1Title={'Cancel'}
          button2Title={'OK'}
          button1Click={() => handleCancelDeleteLocation()}
          button2Click={() => handleDeleteLocation()}
        ></CustomModal>
      );
    }
  };

  const handleDeleteClick = (e, row) => {
    e.stopPropagation();
    setLocationForDelete(row);
  };

  const handleDeleteLocation = async () => {
    try {
      await LocationsService.deleteLocation(locationForDelete.id);
      setLocationForDelete(null);
      getLocations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDeleteLocation = () => {
    setLocationForDelete(null);
  };

  const renderLocations = () => {
    if (isLoadingLocations) {
      // TODO: Loading component
    } else if (!locations || locations.length === 0) {
      // TODO: No data
    } else {
      return (
        <Table
          columns={getTableColumns()}
          data={locations}
          handleClick={row => {
            history.push(`/${row.id}`);
          }}
        ></Table>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>Locations</h1>
        <br />
        <div className="row">{renderLocations()}</div>
        <button type="button" className="btn btn-primary" onClick={e => history.push('/create')}>
          Add Location
        </button>
      </div>

      {renderDeleteModal()}
    </React.Fragment>
  );
}
export default Locations;
