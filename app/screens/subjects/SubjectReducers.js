import {GET_SUBJECTS_OK} from './SubjectActionTypes';

const initialState = {
  defaultResult: 0,
  subjectsConfig: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECTS_OK:
      return {...state, subjectsConfig: action.payload};
    default:
      return state;
  }
};
