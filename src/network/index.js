import axios from 'axios';
import {CONSTANTS} from '../constants';

// Create axios client, pre-configured with baseURL
let Axios = axios.create({
  baseURL: CONSTANTS.API_CALLS.BASE_URL,
  timeout: 60000,
});

export default Axios;
