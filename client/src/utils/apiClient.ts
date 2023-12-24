import {base_URL} from '@env';
import api from '../api/$api';
import aspida from '@aspida/axios';
const apiClient = api(
  aspida(undefined, {
    baseURL: `${base_URL}/api`,
  }),
);
export default apiClient;
