import {GET_USER_INFO_OK, UPDATE_USER_INFO_OK} from './ProfileActionsTypes';

const initialState = {
  defaultResult: 0,
  profileInfoConfig: undefined,
  profileUpdateConfig: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_OK:
      return {...state, profileInfoConfig: action.payload};
    case UPDATE_USER_INFO_OK:
      return {...state, profileUpdateConfig: action.payload};
    default:
      return state;
  }
};
