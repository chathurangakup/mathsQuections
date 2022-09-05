import {
  GET_ALL_STUDENTS_INFO_OK,
  GET_ALL_STUDENTS_MARKS_INFO_OK
} from './BattleMarksActionTypes';

const initialState = {
  defaultResult: 0,
  allStudentsInfoConfig: undefined,
  allStudentsMarksInfoConfig:undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STUDENTS_INFO_OK:
      return {...state, allStudentsInfoConfig: action.payload};
    case GET_ALL_STUDENTS_MARKS_INFO_OK:
      return {...state, allStudentsMarksInfoConfig: action.payload};
    default:
      return state;
  }
};
