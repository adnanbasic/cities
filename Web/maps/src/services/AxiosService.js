import axios from 'axios';

class AxiosWrapper {
  constructor(baseURL) {
    this.client = axios.create({ baseURL });
  }

  request = async options => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.client(options));
      } catch (error) {
        if (!error.response) {
          reject(error);
          return;
        }
      }
    });
  };
}

export default AxiosWrapper;
