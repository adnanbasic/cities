import React, { useEffect, useState } from 'react';

import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import * as LocationsService from 'services/LocationsService';
import * as CityService from 'services/CityService';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateLocation(props) {
  const [locationId] = useState(props.match.params.id);
  const [location, setLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [cities, setCities] = useState(null);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    address: '',
    cityId: 0,
    longitude: '',
    latitude: '',
  });

  let history = useHistory();

  useEffect(() => {
    if (locationId) {
      setIsEdit(true);
      getLocation();
    }
    getCities();
  }, []);

  const getLocation = async () => {
    try {
      setIsLoadingLocation(true);
      const response = await LocationsService.getLocation(locationId);
      setLocation(response.data);
      setInitialValues({
        name: response.data.name,
        address: response.data.address,
        cityId: response.data.cityId,
        longitude: response.data.longitude,
        latitude: response.data.latitude,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const renderCities = () => {
    let options = [
      <option key={0} value={0} disabled>
        Please select
      </option>,
    ];
    if (cities) {
      options.push(
        cities.map(x => (
          <option key={x.id} value={x.id}>
            {x.name}
          </option>
        ))
      );
    }
    return options;
  };

  const getCities = async () => {
    try {
      setIsLoadingCities(true);
      const response = await CityService.getCities(locationId);
      setCities(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const showError = condition => {
    if (condition) {
      return { display: 'block' };
    }
  };

  const renderForm = () => {
    return (
      <div>
        <h1>Add Location</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            } else if (values.name.length > 20) {
              errors.name = 'Invalid Name';
            }

            if (!values.address) {
              errors.address = 'Required';
            } else if (values.address.length > 50) {
              errors.address = 'Invalid Address';
            }

            if (!values.cityId) {
              errors.cityId = 'Required';
            }

            if (!values.longitude) {
              errors.longitude = 'Required';
            } else if (parseFloat(values.longitude) < -180 || parseFloat(values.longitude) > 180) {
              errors.longitude = 'Invalid Longitude';
            }

            if (!values.latitude) {
              errors.latitude = 'Required';
            } else if (parseFloat(values.latitude) < -90 || parseFloat(values.latitude) > 90) {
              errors.latitude = 'Invalid Latitude';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const request = {
                name: values.name,
                address: values.address,
                cityId: parseInt(values.cityId),
                longitude: values.longitude,
                latitude: values.latitude,
              };

              if (isEdit) {
                await LocationsService.updateLocation(locationId, request);
                history.push(`/`);
              } else {
                await LocationsService.createLocation(request);
                history.push(`/`);
              }
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, values }) => {
            return (
              <div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      disabled={isSubmitting}
                      placeholder="Enter name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={showError(errors.name && touched.name)}
                    >
                      {errors.name && touched.name && errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      disabled={isSubmitting}
                      placeholder="Enter address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={showError(errors.address && touched.address)}
                    >
                      {errors.address && touched.address && errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="cityId">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      as="select"
                      name="cityId"
                      type="number"
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cityId}
                    >
                      {renderCities()}
                    </Form.Control>
                    <Form.Control.Feedback
                      type="invalid"
                      style={showError(errors.cityId && touched.cityId)}
                    >
                      {errors.cityId && touched.cityId && errors.cityId}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="longitude">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="number"
                      name="longitude"
                      disabled={isSubmitting}
                      placeholder="Enter longitude"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.longitude}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={showError(errors.longitude && touched.longitude)}
                    >
                      {errors.longitude && touched.longitude && errors.longitude}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="latitude">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="number"
                      name="latitude"
                      disabled={isSubmitting}
                      placeholder="Enter latitude"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.latitude}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={showError(errors.latitude && touched.latitude)}
                    >
                      {errors.latitude && touched.latitude && errors.latitude}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="button" onClick={() => history.push('/')}>
                    Cancel
                  </Button>
                  &nbsp;
                  <Button variant="primary" disabled={isSubmitting} type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">{renderForm()}</div>
    </div>
  );
}
export default CreateLocation;
