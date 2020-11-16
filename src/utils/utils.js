
const filterByString = (elems, getString, stringTofilter) =>
  elems.filter((e) =>
    getString(e).toLowerCase().includes(stringTofilter.toLowerCase()),
  );

export const anySatisfy = (elems, value) => elems.reduce((r, e) => r || e === value, false);

export default {
  filterByString,
  anySatisfy,
};
