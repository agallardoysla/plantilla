
const filterByString = (elems, getString, stringTofilter) =>
  elems.filter((e) =>
    getString(e).toLowerCase().includes(stringTofilter.toLowerCase()),
  );

export default {
  filterByString,
};
