// /client/src/utils/apiClient.ts

import axios from 'axios';
import api from '../api/$api';
// import api from '@backend/api/$api';
// import api from '../../../serverFrourio/api/$api';
import aspida from '@aspida/axios';

export const baseurl = 'https://armapsnsnative.onrender.com';
const apiClient = api(
  aspida(undefined, {
    // baseURL: 'http://localhost:31577/api',
    baseURL: `${baseurl}/api`,
  }),
);
// const apiClient = api(aspida(axios.create({withCredentials: true})));

export default apiClient;
