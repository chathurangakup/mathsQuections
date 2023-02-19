import {
  GET_QUECTIONS_OK,
  GET_USER_REVIEW_OK,
  ADD_REVIEW_OK,
  DELETE_REVIEW_OK,
  SHOW_ADVERTICE_OK,
  GET_BATTLE_QUECTIONS_OK,
  ADD_BATTLE_MARKS_OK,
} from './QuectionsMainActionTypes';

const initialState = {
  defaultResult: 0,
  quectionsConfig: undefined,
  reviewInfoConfig: undefined,
  addReviewConfig: undefined,
  deleteReviewConfig: undefined,
  showAdverticeConfig: undefined,
  addBattleMarksConfig: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUECTIONS_OK:
      return {...state, quectionsConfig: action.payload};
    case GET_BATTLE_QUECTIONS_OK:
      return {...state, quectionsConfig: action.payload};
    case GET_USER_REVIEW_OK:
      return {...state, reviewInfoConfig: action.payload};
    case ADD_REVIEW_OK:
      return {...state, addReviewConfig: action.payload};
    case DELETE_REVIEW_OK:
      return {...state, deleteReviewConfig: action.payload};
    case SHOW_ADVERTICE_OK:
      return {...state, showAdverticeConfig: action.payload};
    case ADD_BATTLE_MARKS_OK:
      return {...state, addBattleMarksConfig: action.payload};
    default:
      return state;
  }
};
