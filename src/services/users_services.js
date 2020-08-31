import generic_service from './generic_service';
import api from './api';

const ble = 'users/';

export default {
  list: () => generic_service.doGet(api.baseURL + ble, {}),
};
