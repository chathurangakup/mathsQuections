import {put, takeLatest} from 'redux-saga/effects';

import { GET_ALL_STUDENTS_INFO, GET_ALL_STUDENTS_INFO_OK, GET_ALL_STUDENTS_MARKS_INFO,GET_ALL_STUDENTS_MARKS_INFO_OK} from './BattleMarksActionTypes';

import {createUrl, ajaxCall, getLanguageId} from '../../lib/Utils';




const getAllStudentsInfo = function* (payload) {
  const updateController = 'users';
  const searchParam = payload;
  console.log('language', searchParam);

  const response = yield ajaxCall(
    createUrl(updateController, 'userRole/' + 'student'),
    payload.payload,
    true,
    'GET',
    true,
  );
  yield put({
    type: GET_ALL_STUDENTS_INFO_OK,
    payload: {
      data: response,
    },
  });
};

export function* getAllStudentsInfoSaga() {
  yield takeLatest(GET_ALL_STUDENTS_INFO, getAllStudentsInfo);
}


const getAllStudentsMarksInfo = function* (payload) {
  const language = yield getLanguageId();
  const updateController = 'battlemark' + language;
  const response = yield ajaxCall(
    createUrl(updateController, 'getAllUsersBattlemarks'),
    payload.payload,
    true,
    'POST',
    true,
  );
  yield put({
    type: GET_ALL_STUDENTS_MARKS_INFO_OK,
    payload: {
      data: response,
    },
  });
};

export function* getAllStudentsMarksInfoSaga() {
  yield takeLatest(GET_ALL_STUDENTS_MARKS_INFO, getAllStudentsMarksInfo);
}