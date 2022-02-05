import {GET_GRADES_OK} from './GradesActionTypes';

const initialState = {
  defaultResult: 0,
  gradesConfig: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADES_OK:
      return {...state, gradesConfig: action.payload};
    default:
      return state;
  }
};
