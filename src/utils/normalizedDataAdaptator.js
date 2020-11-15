const elemToId = (elem) => elem.id.toString();

export const adapt = (elems) => {
  return {
    byId: elems.reduce((r, elem) => {
      r[elemToId(elem)] = elem;
      return r;
    }, {}),
    allIds: elems.map(elemToId),
  };
};
