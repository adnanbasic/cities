import AxiosWrapper from 'services/AxiosService';

const axiosService = new AxiosWrapper(process.env.REACT_APP_API);

export const getCities = async () => {
  return axiosService.request({
    url: `/cities`,
    method: 'GET',
  });
};
