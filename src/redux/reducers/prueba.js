export const SET_PRUEBA = 'SET_PRUEBA';

export const setPrueba = (prueba) => ({
  type: SET_PRUEBA,
  prueba,
});

const initialState = {
  prueba: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRUEBA:
      return {
        ...state,
        prueba: action.prueba,
      };
    default:
      return state;
  }
};
