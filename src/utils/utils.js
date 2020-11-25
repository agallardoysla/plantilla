
const filterByString = (elems, getString, stringTofilter) =>
  elems.filter((e) =>
    getString(e).toLowerCase().includes(stringTofilter.toLowerCase()),
  );

export const anySatisfy = (elems, value) => elems.reduce((r, e) => r || e === value, false);

const getPageOffset = (_page, pages) => {
  let res = 0;
  for (var i = 0; i < _page; i++) {
    res += pages[i];
  }
  return res;
};
export default {
  filterByString,
  anySatisfy,
  getPageOffset
};
