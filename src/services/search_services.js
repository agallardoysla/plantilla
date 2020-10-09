import generic_service from './generic_service';

const url = 'search/';

export default {
  search: (data) => generic_service.doPut(url, data),
}