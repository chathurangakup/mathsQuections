import {put, takeLatest} from 'redux-saga/effects';

import {
  GET_QUECTIONS,
  GET_QUECTIONS_OK,
  GET_USER_REVIEW,
  GET_USER_REVIEW_OK,
  ADD_REVIEW,
  ADD_REVIEW_OK,
  DELETE_REVIEW,
  DELETE_REVIEW_OK,
  SHOW_ADVERTICE,
  SHOW_ADVERTICE_OK,
  GET_BATTLE_QUECTIONS,
  GET_BATTLE_QUECTIONS_OK,
  ADD_BATTLE_MARKS,
  ADD_BATTLE_MARKS_OK
} from './QuectionsMainActionTypes';

import {createUrl, ajaxCall, getLanguageId} from '../../lib/Utils';

const getQuections = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'teachersquection' + language;
  console.log('quections', payload);

  const response = yield ajaxCall(
    createUrl(updateController, 'getAllQuection'),
    payload.payload,
    true,
    'POST',
    true,
  );
  console.log('quectionsResp', response);

  yield put({
    type: GET_QUECTIONS_OK,
    payload: {
      data: response,
    },
  });
};

export function* getQuectionsSaga() {
  yield takeLatest(GET_QUECTIONS, getQuections);
}



const getBattleQuections = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'battlequections' + language;
  console.log('quections', payload);

  const response = yield ajaxCall(
    createUrl(updateController, 'getAllQuection'),
    payload.payload,
    true,
    'POST',
    true,
  );
  console.log('quectionsResp', response);

  yield put({
    type: GET_BATTLE_QUECTIONS_OK,
    payload: {
      data: response,
    },
  });
};

export function* getBattleQuectionsSaga() {
  yield takeLatest(GET_BATTLE_QUECTIONS, getBattleQuections);
}

//get reviews
const getReviews = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'reviews' + language;
  const searchParam = payload;
  console.log('language', searchParam);

  const response = yield ajaxCall(
    createUrl(updateController, 'getReview'),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: GET_USER_REVIEW_OK,
    payload: {
      data: response,
    },
  });
};

export function* getReviewsSaga() {
  yield takeLatest(GET_USER_REVIEW, getReviews);
}

//add comment
const addReview = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'reviews' + language;
  const searchParam = payload;
  console.log('language', searchParam);

  const response = yield ajaxCall(
    createUrl(updateController, '/addReviews'),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: ADD_REVIEW_OK,
    payload: {
      data: response,
    },
  });
};

export function* addReviewSaga() {
  yield takeLatest(ADD_REVIEW, addReview);
}

//delete comment
const deleteReview = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'reviews' + language;
  const searchParam = payload;
  console.log('language', searchParam);

  const response = yield ajaxCall(
    createUrl(updateController, '/deleteReview/' + payload.reviewId),
    payload.payload,
    true,
    'GET',
    true,
  );
  yield put({
    type: DELETE_REVIEW_OK,
    payload: {
      data: response,
    },
  });
};

export function* deleteReviewSaga() {
  yield takeLatest(DELETE_REVIEW, deleteReview);
}

//show adverticve
const showAdvertice = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'advertisement' + language;
  const searchParam = payload;
  console.log('language', searchParam);

  const response = yield ajaxCall(
    createUrl(updateController, '/getAdvertisement'),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: SHOW_ADVERTICE_OK,
    payload: {
      data: response,
    },
  });
};

export function* showAdverticeSaga() {
  yield takeLatest(SHOW_ADVERTICE, showAdvertice);
}


//add battle marks
const addBattleMarks = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'battlemark' + language;
  const searchParam = payload;
  console.log('language', searchParam);

  const response = yield ajaxCall(
    createUrl(updateController, '/addUsersBattleMarks'),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: ADD_BATTLE_MARKS_OK,
    payload: {
      data: response,
    },
  });
};

export function* addBattleMarksSaga() {
  yield takeLatest(ADD_BATTLE_MARKS, addBattleMarks);
}
