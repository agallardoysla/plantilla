export default {
  // fontFamily: 'GothamBlack-Regular',
  fontFamily: null,
  fontWeight: '900',
  fontSize: 14,
  color: 'rgb(233, 252, 100)',
  colorSelection: 'rgba(232, 252, 100, 0.37)',
};

export const baseToast = (params) => ({
  type: 'success',
  position: 'bottom',
  visibilityTime: 4000,
  autoHide: true,
  bottomOffset: 40,
  ...params,
});