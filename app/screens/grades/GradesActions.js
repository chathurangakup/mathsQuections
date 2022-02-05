import {put, takeLatest} from 'redux-saga/effects';

import {GET_GRADES, GET_GRADES_OK} from './GradesActionTypes';

import {createUrl, ajaxCall, getLanguageId} from '../../lib/Utils';

const getGrades = function* () {
  const language = yield getLanguageId();
  const updateController = 'grades' + language;

  const response = yield ajaxCall(
    createUrl(updateController, 'allGrades'),
    {},
    true,
    'GET',
    true,
  );
  yield put({
    type: GET_GRADES_OK,
    payload: {
      data: response,
    },
  });
};

export function* getGradesSaga() {
  yield takeLatest(GET_GRADES, getGrades);
}
