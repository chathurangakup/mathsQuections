import {
  GET_QUECTIONS_OK,
  GET_USER_REVIEW_OK,
  ADD_REVIEW_OK,
  DELETE_REVIEW_OK,
} from './QuectionsMainActionTypes';

const initialState = {
  defaultResult: 0,
  quectionsConfig: undefined,
  reviewInfoConfig: undefined,
  addReviewConfig: undefined,
  deleteReviewConfig: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUECTIONS_OK:
      return {...state, quectionsConfig: action.payload};
    case GET_USER_REVIEW_OK:
      return {...state, reviewInfoConfig: action.payload};
    case ADD_REVIEW_OK:
      return {...state, addReviewConfig: action.payload};
    case DELETE_REVIEW_OK:
      return {...state, deleteReviewConfig: action.payload};
    default:
      return state;
  }
};
