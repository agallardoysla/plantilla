export const UPDATE_OTHER_USER = 'UPDATE_OTHER_USER';

export function updateOterUser(user) {
  return {
    type: UPDATE_OTHER_USER,
    payload: user
  };
}


