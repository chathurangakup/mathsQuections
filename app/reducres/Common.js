import {DEFALUT} from '../actyonTypes/Common';

const initialState = {
  defaultResult: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEFALUT:
      return {...state, defaultResult: initialState.defaultResult};
    default:
      return state;
  }
};
