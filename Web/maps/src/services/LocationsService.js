import AxiosWrapper from 'services/AxiosService';

const axiosService = new AxiosWrapper(process.env.REACT_APP_API);

export const createLocation = async data => {
  return axiosService.request({
    url: `/locations`,
    method: 'POST',
    data,
  });
};

export const updateLocation = async (id, data) => {
  return axiosService.request({
    url: `/locations/${id}`,
    method: 'PUT',
    data,
  });
};

export const getLocation = async id => {
  return axiosService.request({
    url: `/locations/${id}`,
    method: 'GET',
  });
};

export const getLocations = async () => {
  return axiosService.request({
    url: `/locations`,
    method: 'GET',
  });
};

export const deleteLocation = async id => {
  return axiosService.request({
    url: `/locations/${id}`,
    method: 'DELETE',
  });
};
