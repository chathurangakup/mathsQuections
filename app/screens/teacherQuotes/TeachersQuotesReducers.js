import {GET_TEACHERS_QUOTES_OK} from './TeachersQuotesActionTypes';

const initialState = {
  defaultResult: 0,
  teachersQuotesConfig: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHERS_QUOTES_OK:
      return {...state, teachersQuotesConfig: action.payload};
    default:
      return state;
  }
};
