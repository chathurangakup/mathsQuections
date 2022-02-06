import {GET_QUECTIONS_OK} from './QuectionsMainActionTypes';

const initialState = {
  defaultResult: 0,
  quectionsConfig: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUECTIONS_OK:
      return {...state, quectionsConfig: action.payload};
    default:
      return state;
  }
};
