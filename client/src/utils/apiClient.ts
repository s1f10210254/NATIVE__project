import axios from 'axios';
import api from '../api/$api';
import aspida from '@aspida/axios';

const apiClient = api(
  aspida(undefined, {
    baseURL: 'http://localhost:31577/api',
  }),
);
// export const apiClient = api(aspida(axios.create({withCredentials: true})));

export default apiClient;
// import aspida from '@aspida/axios';
// import api from 'api/$api';
// import axios from 'axios';

// export const apiClient = api(aspida(axios.create({withCredentials: true})));
