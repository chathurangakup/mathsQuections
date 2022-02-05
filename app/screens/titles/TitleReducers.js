import {GET_TITLES_OK} from './TitleActionTypes';

const initialState = {
  defaultResult: 0,
  titlesConfig: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TITLES_OK:
      return {...state, titlesConfig: action.payload};
    default:
      return state;
  }
};
